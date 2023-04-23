import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const {
      body: { categories, content, title, summary },
    }: {
      body: {
        categories: string[];
        content: string;
        title: string;
        summary: string;
      };
    } = req;

    const allCategories = await client.category.findMany({});

    const existedCategories = allCategories
      .filter((item) => categories.includes(item.category))
      .map((item) => ({ ...item }));
    const nonExistedCategories = categories.filter(
      (existed) => !allCategories.map((item) => item.category).includes(existed)
    );

    const post = await client.myBlog.create({
      data: {
        title,
        content,
        summary,
        category: {
          create: nonExistedCategories.map((category) => ({ category })),
          connect: existedCategories.map((category) => ({ id: category.id })),
        },
      },
    });

    return res.json({
      ok: true,
      post,
    });
  }
  if (req.method === "GET") {
    const limit = 10;
    const {
      query: { page },
    } = req;
    const posts = await client.myBlog.findMany({
      include: {
        category: true,
      },
      orderBy: {
        created: "desc",
      },
      take: limit,
      skip: (+page - 1) * limit,
    });
    const nextPosts = await client.myBlog.findMany({
      include: {
        category: true,
      },
      orderBy: {
        created: "desc",
      },
      take: limit,
      skip: (+page - 1 + 1) * limit,
    });
    res.json({
      ok: true,
      posts,
      nextPosts,
    });
  }
}

export default withHandler({
  methods: ["POST", "GET"],
  handler,
  isPrivate: false,
});
