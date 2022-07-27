import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const {
      body: {
        title,
        thumbnail,
        developDate,
        content,
        github,
        deploy,
        deployIcon,
      },
    } = req;
    const portfolio = await client.myPortfolio.create({
      data: {
        title,
        thumbnail,
        developDate,
        content,
        github,
        deploy,
        deployIcon,
      },
    });
    res.json({
      ok: true,
      portfolio,
    });
  }
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
}

export default withHandler({
  methods: ["POST", "GET"],
  handler,
  isPrivate: false,
});
