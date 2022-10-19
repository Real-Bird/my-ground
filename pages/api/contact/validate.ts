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
      body: { secret },
    } = req;
    const cryptoPwd = await client.myGroundPost.findUnique({
      where: {
        id: +id,
      },
    });
    const isVerified = await argon2.verify(cryptoPwd.password, secret);
    if (!isVerified)
      return res.json({ ok: false, error: "Not Verified Password" });
    res.json({
      ok: true,
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
