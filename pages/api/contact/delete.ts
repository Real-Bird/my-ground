import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import * as argon2 from "argon2";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const {
      query: { id },
      body: { password },
    } = req;
    const post = await client.myGroundPost.findUnique({
      where: {
        id: +id,
      },
    });
    const isVerified = await argon2.verify(post.password, password);
    if (!isVerified)
      return res.json({ ok: false, error: "비밀번호가 일치하지 않습니다." });
    const deletePost = await client.myGroundPost.delete({
      where: {
        id: +id,
      },
    });
    res.json({
      ok: true,
      deletePost,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: false,
  })
);
