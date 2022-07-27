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
    res.json({
      ok: true,
      portfolio,
    });
  }
  if (req.method === "POST") {
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
