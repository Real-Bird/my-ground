import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
      admin: boolean;
      token: string;
    };
  }
}

const cookieOptions = {
  cookieName: "myGroundSession",
  password: process.env.SESSION_PWD!,
  cookieOptions: {
    maxAge: 1_209_600,
  },
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}

export function withSsrSession(handler: any) {
  return withIronSessionSsr(handler, cookieOptions);
}
