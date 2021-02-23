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
          const range = req.headers.range?.replace("bytes=", "").split("-");

          fileStream
            .on("open", () => {
              const stats = fs.statSync(httpResponse.audioFile);
              const fileSizeInBytes = stats["size"];

              let bytes_start, bytes_end;
              if (range) {
                bytes_start = range[0] ? parseInt(range[0], 10) : 0;
                bytes_end = range[1] ? parseInt(range[1], 10) : fileSizeInBytes;
              } else {
                bytes_start = 0;
                bytes_end = fileSizeInBytes;
              }
              const chunk_size = bytes_end - bytes_start;
              if (chunk_size == fileSizeInBytes) {
                // Serve the whole file as before
                res.setHeader("Content-Length", fileSizeInBytes);
              } else {
                // HTTP/1.1 206 is the partial content response code
                res.setHeader(
                  "Content-Range",
                  "bytes " +
                    bytes_start +
                    "-" +
                    bytes_end +
                    "/" +
                    fileSizeInBytes
                );
                res.setHeader("Content-Length", fileSizeInBytes);
              }
              fileStream.pipe(res);
            })
            .on("end", () => {
              res.end();
              // setTimeout(() => {
              //   fs.unlink(httpResponse.audioFile, (err) => {
              //     if (err) throw new Error(err.message);
              //     return;
              //   });
              // }, 1000);
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
