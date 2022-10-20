import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import * as argon2 from "argon2";
import { withApiSession } from "@libs/server/withSession";
import crypto from "crypto";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const {
      body: { name, password, content, title, secret },
    } = req;
    const pwdHash = await argon2.hash(password);
    let token;
    if (!req.session.user) {
      token = crypto
        .createHash("sha256")
        .update(`${name}${password}${title}`)
        .digest("hex");
      req.session.user = {
        id: Math.floor(Math.random() * 154846),
        admin: false,
        token,
      };
      await req.session.save();
    } else {
      token = req.session.user?.token;
    }
    const post = await client.myGroundPost.create({
      data: {
        name,
        password: pwdHash,
        title,
        content,
        isSecret: secret,
        token,
      },
    });
    res.json({
      ok: true,
      post,
    });
  }
  if (req.method === "GET") {
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    const posts = await client.myGroundPost.findMany({
      select: {
        id: true,
        name: true,
        title: true,
        created: true,
        updated: true,
        isSecret: true,
        token: true,
      },
      orderBy: {
        created: "desc",
      },
    });
    posts.map((p) => {
      if (p.isSecret) {
        p.title = "비밀글입니다.";
      }
    });
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=29"
    );
    res.json({
      ok: true,
      posts,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST", "GET"],
    handler,
    isPrivate: false,
  })
);
