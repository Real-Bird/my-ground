import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import * as argon2 from "argon2";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const {
      query: { id },
    } = req;
    const post = await client.myGroundPost.findUnique({
      where: {
        id: +id,
      },
    });
    if (!post) return res.json({ ok: false, post: null });
    res.json({
      ok: true,
      post,
    });
  }
  if (req.method === "POST") {
    const {
      query: { id },
      body: { title, content, password },
    } = req;
    const cryptoPwd = await client.myGroundPost.findUnique({
      where: {
        id: +id,
      },
    });
    const isVerified = await argon2.verify(cryptoPwd.password, password);
    if (!isVerified)
      return res.json({ ok: false, error: "Not Verified Password" });
    const post = await client.myGroundPost.update({
      where: {
        id: +id,
      },
      data: {
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
