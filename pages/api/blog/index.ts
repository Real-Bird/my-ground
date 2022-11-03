import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const {
      body: { category, content, title, summary },
    } = req;
    const existCategory = await client.category.findFirst({
      where: {
        category,
      },
      select: {
        id: true,
      },
    });
    if (!existCategory) {
      const post = await client.myBlog.create({
        data: {
          title,
          content,
          summary,
          category: {
            create: {
              category,
            },
          },
        },
      });
      res.json({
        ok: true,
        post,
      });
    } else {
      const post = await client.myBlog.create({
        data: {
          title,
          content,
          summary,
          category: {
            connect: {
              id: existCategory.id,
            },
          },
        },
      });
      res.json({
        ok: true,
        post,
      });
    }
  }
  if (req.method === "GET") {
    const posts = await client.myBlog.findMany({
      include: {
        category: true,
      },
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

export default withHandler({
  methods: ["POST", "GET"],
  handler,
  isPrivate: false,
});
