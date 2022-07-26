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
    const post = await client.myBlog.findUnique({
      where: {
        id: +id,
      },
    });
    res.json({
      ok: true,
      post,
    });
  }
  if (req.method === "POST") {
    const {
      query: { id },
      body: { title, content, category },
    } = req;
    const post = await client.myBlog.update({
      where: {
        id: +id,
      },
      data: {
        category,
        title,
        content,
      },
    });
    res.json({
      ok: true,
      post,
    });
  }
}

export default withHandler({
  methods: ["GET", "POST"],
  handler,
  isPrivate: false,
});
