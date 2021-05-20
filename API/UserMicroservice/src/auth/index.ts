import express from "express";
import jwt from "jsonwebtoken";

declare global {
  type TBuildAuth = (envConfig: any) => TAuth;

  type TAuth = Readonly<{
    checkSignIn: (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => Promise<express.Response<any, Record<string, any>> | undefined>;
    checkSignOut: (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => express.Response<any, Record<string, any>> | undefined;
    generateJWTToken: (token: string) => string;
  }>;
}

const buildAuthMiddleware = (envConfig: any) => {
  return Object.freeze({
    checkSignIn: async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // const db = await makeDb();
      // @ts-ignore
      const { accessToken } = req!.session!;
      // Check for token
      if (!accessToken) {
        return res.status(401).send("authorization denied");
      } else {
        jwt.verify(accessToken, envConfig["JWT_TOKEN"]);
      }
      next();
    },
    checkSignOut: (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      // @ts-ignore
      const { accessToken } = req!.session!;
      // Check for token
      if (!accessToken) {
        return res.status(401).send("Not logged in");
      }
      next();
    },
    generateJWTToken: (token: string) =>
      // @ts-ignore
      jwt.sign(token, envConfig["JWT_SECRET"]),
  });
};

export default buildAuthMiddleware;
