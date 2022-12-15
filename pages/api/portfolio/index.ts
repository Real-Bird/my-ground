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
        stackBadge,
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
    stackBadge.map(async (stack: { stackName: string; stackColor: string }) => {
      await client.stackBadge.create({
        data: {
          pf: {
            connect: {
              id: createPf.id,
            },
          },
          stackName: stack.stackName,
          stackColor: stack.stackColor,
        },
      });
    });
    res.json({
      ok: true,
      newPFId: createPf.id,
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
