import express from "express";
import fs from "fs";
import path from "path";
import envConfig from "./env";

import morgan from "morgan";
import helmet from "helmet";

import { getAudio } from "./controllers";
import MakeExpressCallback from "./expressCallback";

const app = express();

const port = process.env.PORT || 5002;

// create tempAudio folder if it doenst exist
if (!fs.existsSync("./src/tempAudio")) {
  fs.mkdirSync("./src/tempAudio");
}

// http request logger
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.post(
  `${envConfig["API_ROOT"]}/audio/generate`,
  MakeExpressCallback(getAudio)
);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send({ error: "An unknown error occurred." });
  }
);

app.listen(port, () => console.log(`Audio API started on port ${port}`));

export default app;
