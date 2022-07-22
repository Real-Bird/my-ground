import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const {
      body: { name, password, content, title },
    } = req;
    const post = await client.myGroundPost.create({
      data: {
        name,
        password,
        title,
        content,
      },
    });
    res.json({
      ok: true,
      post,
    });
  }
  if (req.method === "GET") {
    const posts = await client.myGroundPost.findMany({
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
