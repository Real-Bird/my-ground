import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const noticePosts = readdirSync("./notice").map((file) => {
    const content = readFileSync(`./notice/${file}`, "utf-8");
    const [slug, _] = file.split(".");
    return { ...matter(content).data, slug };
  });
  res.json({ ok: true, noticePosts });
}

export default withApiSession(
  withHandler({ methods: ["GET"], handler, isPrivate: false })
);
