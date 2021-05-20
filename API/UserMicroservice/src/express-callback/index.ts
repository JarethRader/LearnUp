import envConfig from "../env";

const makeExpressCallback: MakeExpressCallback = (controller, auth) => {
  return (req, res, next) => {
    const httpRequest: ExpressHttpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      session: req.session as any,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
      },
    };
    try {
      controller(httpRequest)
        .then((httpResponse: IController) => {
          if (httpResponse.session?.accessToken) {
            // @ts-ignore
            const token = auth.generateJWTToken(
              httpResponse.session.accessToken
            );
            res.cookie("access", token, {
              httpOnly: true,
            });
          }
          if (httpResponse.session?.destroy) {
            // @ts-ignore
            // req!.session!.destroy();
            res.clearCookie(envConfig["SESS_NAME"] as string);
          }
          if (httpResponse.headers) {
            res.set(httpResponse.headers);
          }
          res.type("json");
          res.status(httpResponse.statusCode).send(httpResponse.body);
        })
        .catch(
          (err: IController) => next(err)
          // res.status(500).send({ error: 'An unkown error occurred.' })
        );
    } catch (err) {
      next(err);
    }
  };
};

export default makeExpressCallback;
