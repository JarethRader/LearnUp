import fs from "fs";

const makeExpressCallback: MakeExpressCallback = (controller) => {
  return (req, res, next) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
      },
    };
    // httpRequest will have to return the filename for the audio file
    controller(httpRequest)
      .then((httpResponse: IController) => {
        if (httpResponse.statusCode === 200) {
          if (httpResponse.headers) {
            res.set(httpResponse.headers);
          }
          res.statusCode = httpResponse.statusCode;

          const fileStream = fs.createReadStream(httpResponse.audioFile);
          fileStream
            .on("open", () => {
              fileStream.pipe(res);
            })
            .on("end", () => {
              res.end();
              setTimeout(() => {
                fs.unlink(httpResponse.audioFile, (err) => {
                  if (err) throw new Error(err.message);
                  return;
                });
              }, 1000);
            });
        } else {
          if (httpResponse.headers) {
            res.set(httpResponse.headers);
          }
          res.type("json");
          res.status(httpResponse.statusCode).send(httpResponse.body);
        }
      })
      .catch((err: Error) => next(err));
  };
};

export default makeExpressCallback;
