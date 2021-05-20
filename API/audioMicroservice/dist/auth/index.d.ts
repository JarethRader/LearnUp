import express from "express";
declare const buildAuthMiddleware: (envConfig: any) => Readonly<{
    checkSignIn: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<express.Response<any, Record<string, any>> | undefined>;
}>;
export default buildAuthMiddleware;
//# sourceMappingURL=index.d.ts.map