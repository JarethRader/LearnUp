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
    generateJWTToken: (token: { user: string }) => string;
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
        const { accessToken } = req!.session!;
        // Check for token
        if (!accessToken) {
          return res.status(401).send("authorization denied");
        } else {
          // TODO: I need to find a way to authenticate the user sending the request with teh data in here without necessarily querying the user DB
          // Although I could create a read-only DB that stores the user and make a microserver that will return a user object or not from a userID
          // and couple that service with everything else; this would let me authenticate users, maintain a separation of concerns among the different
          // services, and
          const userID = jwt.verify(accessToken, envConfig["JWT_SECRET"]);
        }
        next();
      } catch (err) {
        next(err);
      }
    },
    checkSignOut: (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        // @ts-ignore
        const { accessToken } = req!.session!;
        // Check for token
        if (!accessToken) {
          return res.status(401).send("Not logged in");
        }
        next();
      } catch (err) {
        next(err);
      }
    },
    generateJWTToken: (token: { user: string }) =>
      // @ts-ignore
      jwt.sign(token, envConfig["JWT_SECRET"]),
  });
};

export default buildAuthMiddleware;
