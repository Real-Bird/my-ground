// import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    if (req.session.user) {
      const userToken = req.session.user?.token;
      res.json({
        ok: true,
        userToken,
      });
    } else {
      res.json({
        ok: false,
      });
    }
  }
}

export default withApiSession(
  withHandler({ methods: ["GET"], handler, isPrivate: false })
);
