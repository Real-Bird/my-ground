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
      session: { user },
      body: { phone, email },
    } = req;
    const isUser = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (isUser && phone === process.env.ADMIN_PWD!) {
      const isVerified = await argon2.verify(isUser.phone, phone);
      if (!isVerified) {
        return res.json({ ok: false, error: "Not Verified Password" });
      }
      req.session.user = {
        id: isUser.id,
      };
      await req.session.save();
      res.json({ ok: true });
    } else {
      const pwdHash = await argon2.hash(phone);
      const admin = await client.user.create({
        data: {
          phone: pwdHash,
          email,
          name: "김진영",
        },
      });
      return res.json({
        ok: true,
        admin,
      });
    }
  }
  if (req.method === "GET") {
    if (req.session.user) {
      const admin = await client.user.findUnique({
        where: {
          id: req.session.user?.id,
        },
      });
      res.json({
        ok: true,
        admin,
      });
    } else {
      res.json({
        ok: false,
      });
    }
  }
}

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler, isPrivate: false })
);
