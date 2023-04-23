import { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
      admin: boolean;
      token: string;
      maxAge: number;
    };
  }
}

const cookieOptions: IronSessionOptions = {
  cookieName: "myGroundSession",
  password: process.env.SESSION_PWD!,
  cookieOptions: {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}

export function withSsrSession(handler: any) {
  return withIronSessionSsr(handler, cookieOptions);
}
