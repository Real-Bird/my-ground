import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const portfolio = await client.myPortfolio.findMany({
      select: {
        id: true,
        title: true,
        thumbnail: true,
      },
      orderBy: {
        startDate: "desc",
      },
    });
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
    } = req;
    const createPf = await client.myPortfolio.create({
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
      await client.stackBadge.create({
        data: {
          pf: {
            connect: {
              id: createPf.id,
            },
          },
          stackName: stack[0],
          stackColor: stack[1],
        },
      });
    });
    res.json({
      ok: true,
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
