import express from "express";
import jwt from "jsonwebtoken";

interface AuthConfig {
  JWT_SECRET: string;
}

declare global {
  type TBuildAuth = (envConfig: AuthConfig) => TAuth;

  type TAuth = Readonly<{
    checkSignIn: (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => Promise<express.Response<any, Record<string, any>> | undefined>;
  }>;
}

const buildAuthMiddleware = (envConfig: AuthConfig) => {
  return Object.freeze({
    checkSignIn: async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      console.log(req.cookies);
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
