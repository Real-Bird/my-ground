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
      body: { name, password, content, title, secret },
    } = req;
    const pwdHash = await argon2.hash(password);
    const post = await client.myGroundPost.create({
      data: {
        name,
        password: pwdHash,
        title,
        content,
        isSecret: secret,
      },
    });
    res.json({
      ok: true,
      post,
    });
  }
  if (req.method === "GET") {
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    const {
      session: { user },
    } = req;
    const posts = await client.myGroundPost.findMany({
      select: {
        id: true,
        name: true,
        title: true,
        created: true,
        updated: true,
        isSecret: true,
      },
      orderBy: {
        created: "desc",
      },
    });
    posts.map((p) => {
      if (p.isSecret && !user?.admin) {
        p.name = "XXXXX";
        p.title = "XXXXX";
      }
    });
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
