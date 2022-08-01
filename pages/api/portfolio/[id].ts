import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const {
      query: { id },
    } = req;
    const portfolio = await client.myPortfolio.findUnique({
      where: {
        id: +id,
      },
      include: {
        stackBadge: {
          select: {
            id: true,
            stackName: true,
            stackColor: true,
          },
        },
      },
    });
    if (!portfolio) return res.json({ ok: false, portfolio: null });
    res.json({
      ok: true,
      portfolio,
    });
  }
  if (req.method === "POST") {
    const {
      body: {
        thumbnail,
        startDate,
        endDate,
        github,
        deploy,
        deployIcon,
        title,
        stacks,
        content,
      },
      query: { id },
    } = req;
    const updatePf = await client.myPortfolio.update({
      where: {
        id: +id,
      },
      data: {
        thumbnail,
        title,
        content,
        deploy,
        startDate,
        endDate,
        github,
        deployIcon,
      },
    });
    stacks.map(async (stack: string) => {
      const existStack = await client.stackBadge.findFirst({
        where: {
          AND: [{ pfId: +id }, { stackName: stack }],
        },
      });
      if (!existStack) {
        await client.stackBadge.create({
          data: {
            pf: {
              connect: {
                id: +id,
              },
            },
            stackName: stack[0],
            stackColor: stack[1],
          },
        });
      }
    });
    res.json({
      ok: true,
      updatePf,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
    isPrivate: false,
  })
);
