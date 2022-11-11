import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import * as argon2 from "argon2";
import { withApiSession } from "@libs/server/withSession";
import { randomChroma, randomColor } from "@libs/client/utils";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const {
      body: { name, password, content, title },
    } = req;
    const pwdHash = await argon2.hash(password);
    const randomColorName = randomColor();
    const randomChromaName = randomChroma();
    const randomColorChroma = `${randomColorName}/${randomChromaName}`;
    const post = await client.myGroundPost.create({
      data: {
        name,
        password: pwdHash,
        title,
        content,
        token: randomColorChroma,
      },
    });
    res.json({
      ok: true,
      post,
    });
  }
  if (req.method === "GET") {
    const posts = await client.myGroundPost.findMany({
      orderBy: {
        created: "desc",
      },
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
