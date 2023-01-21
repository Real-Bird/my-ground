// import twilio from "twilio";
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
      body: { phone, email },
    } = req;
    const isUser = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (isUser) {
      const isVerified = await argon2.verify(isUser.phone, phone);
      if (!isVerified) {
        return res.json({ ok: false, error: "Not Verified Password" });
      }
      if (phone === process.env.ADMIN_PWD!) {
        req.session.user = {
          id: isUser.id,
          admin: true,
          token: "admin",
          maxAge: 60 * 60 * 24 * 7,
        };
        await req.session.save();
        res.json({ ok: true });
      }
    } else {
      if (!(phone === process.env.ADMIN_PWD!)) {
        return res.json({
          ok: false,
          error: "You are Not Admin! Don't hack me!",
        });
      }
      const pwdHash = await argon2.hash(phone);
      const admin = await client.user.create({
        data: {
          phone: pwdHash,
          email,
          name: "김진영",
        },
      });
      res.json({
        ok: true,
        admin,
      });
    }
  }
  if (req.method === "GET") {
    const session = req.session.user;
    if (!session.admin)
      return res.json({
        ok: false,
      });
    const admin = await client.user.findUnique({
      where: {
        id: session?.id,
      },
      select: {
        id: true,
        name: true,
      },
    });
    session.maxAge = 60 * 60 * 24 * 7;
    await req.session.save();
    res.json({
      ok: true,
      admin,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler, isPrivate: false })
);
