import express from "express";
import jwt from "jsonwebtoken";

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
