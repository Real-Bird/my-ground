import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const {
      body: { content, title, password },
    } = req;
    console.log(title, content, password);

    //   const post = await client.myPortfolio.create({
    //     data: {
    //       title,
    //       content,
    //     },
    //   });
    //   res.json({
    //     ok: true,
    //     post,
    //   });
  }
  if (req.method === "GET") {
    const posts = await client.myPortfolio.findMany({
      orderBy: {
        created: "desc",
      },
    });
    res.json({
      ok: true,
      posts,
    });
  }
}

export default withHandler({ methods: ["POST", "GET"], handler });
