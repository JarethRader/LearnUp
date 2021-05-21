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
  }>;
}

const buildAuthMiddleware = (envConfig: any) => {
  return Object.freeze({
    checkSignIn: async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        // @ts-ignore
        const accessToken = req.cookies.access;
        // Check for token
        if (!accessToken) {
          return res.status(401).send("authorization denied");
        } else {
          const userID = jwt.verify(accessToken, envConfig["JWT_SECRET"]);
        }
        next();
      } catch (err) {
        next(err);
      }
    },
  });
};

export default buildAuthMiddleware;
