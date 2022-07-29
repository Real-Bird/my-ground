import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

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
        developDate,
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
        developDate,
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
          badgeIcon: stack,
        },
      });
    });
    res.json({
      ok: true,
    });
  }
}

export default withHandler({
  methods: ["GET", "POST"],
  handler,
  isPrivate: false,
});
