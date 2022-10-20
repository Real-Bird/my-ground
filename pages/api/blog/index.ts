import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const {
      body: { category, content, title },
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
    // const categories = await client.category.findMany({
    //   select: {
    //     id: true,
    //     category: true,
    //   },
    // });
    // const posts = await client.myBlog.findMany({
    //   orderBy: {
    //     created: "desc",
    //   },
    // });
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
      // categories,
      posts,
    });
  }
}

export default withHandler({
  methods: ["POST", "GET"],
  handler,
  isPrivate: false,
});
