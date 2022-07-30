import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

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
    if (!req.session.user?.admin)
      return res.json({
        ok: false,
        message: "You are Not Admin! Don't hack me!",
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

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
    isPrivate: false,
  })
);
