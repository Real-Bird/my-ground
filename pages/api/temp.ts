// import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ["GET"], handler, isPrivate: false })
);