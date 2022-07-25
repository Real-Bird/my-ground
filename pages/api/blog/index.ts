import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import * as argon2 from "argon2";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const {
      body: { category, content, title },
    } = req;
    const post = await client.myBlog.create({
      data: {
        title,
        content,
        category,
      },
    });
    res.json({
      ok: true,
      post,
    });
  }
  if (req.method === "GET") {
    const categories = await client.myBlog.findMany({
      select: {
        category: true,
        id: true,
      },
    });
    const posts = await client.myBlog.findMany({
      orderBy: {
        created: "desc",
      },
    });
    res.json({
      ok: true,
      categories,
      posts,
    });
  }
}

export default withHandler({
  methods: ["POST", "GET"],
  handler,
  isPrivate: false,
});
