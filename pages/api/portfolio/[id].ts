import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

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
            badgeIcon: true,
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
        developDate,
        github,
        deploy,
        deployIcon,
        title,
        stacks,
        content,
      },
      query: { id },
    } = req;
    const createPf = await client.myPortfolio.update({
      where: {
        id: +id,
      },
      data: {
        thumbnail,
        title,
        content,
        deploy,
        developDate,
        github,
        deployIcon,
      },
    });
    stacks.map(async (stack: string) => {
      const existStack = await client.stackBadge.findFirst({
        where: {
          AND: [{ pfId: +id }, { badgeIcon: stack }],
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
            badgeIcon: stack,
          },
        });
      }
    });
    res.json({
      ok: true,
      createPf,
    });
  }
}

export default withHandler({
  methods: ["GET", "POST"],
  handler,
  isPrivate: false,
});
