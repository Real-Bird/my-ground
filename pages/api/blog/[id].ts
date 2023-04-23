import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    if (!req.session.user?.admin)
      return res.json({
        ok: false,
        message: "You are Not Admin! Don't hack me!",
      });

    const {
      query: { id },
    } = req;

    const post = await client.myBlog.findUnique({
      where: {
        id: +id,
      },
      include: {
        category: {
          select: {
            category: true,
          },
        },
      },
    });

    const prevPost = await client.myBlog.findMany({
      take: -1,
      skip: 1,
      cursor: {
        id: +id,
      },
      select: {
        id: true,
        title: true,
      },
    });
    const nextPost = await client.myBlog.findMany({
      take: 1,
      skip: 1,
      cursor: {
        id: +id,
      },
      select: {
        id: true,
        title: true,
      },
    });
    res.json({
      ok: true,
      post,
      prevPost,
      nextPost,
    });
  }
  if (req.method === "POST") {
    const {
      query: { id },
      body,
    } = req;
    const {
      title,
      content,
      categories,
      summary,
    }: {
      title: string;
      content: string;
      categories: string[];
      summary: string;
    } = body;

    const allCategories = await client.category.findMany({});

    const existedCategories = await client.category.findMany({
      where: {
        posts: {
          some: {
            id: +id,
          },
        },
      },
    });

    const deleteCategories = existedCategories.filter(
      (item) => !categories.includes(item.category)
    );

    const newCategories = categories.filter(
      (category) =>
        !existedCategories.map((item) => item.category).includes(category)
    );

    const alreadyCategories = allCategories
      .filter((item) => newCategories.includes(item.category))
      .map((item) => ({ ...item }));

    const nonExistedCategories = newCategories.filter(
      (existed) => !allCategories.map((item) => item.category).includes(existed)
    );

    const updatePost = await client.myBlog.update({
      where: {
        id: +id,
      },
      data: {
        title,
        summary,
        content,
        category: {
          disconnect: deleteCategories.map((category) => ({ id: category.id })),
          create: nonExistedCategories.map((category) => ({
            category,
          })),
          connect: alreadyCategories.map((category) => ({ id: category.id })),
        },
      },
    });

    return res.json({ ok: true, updatePost });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
    isPrivate: false,
  })
);
