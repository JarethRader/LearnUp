import express from "express";
import fs from "fs";
import envConfig from "./env";

import buildAuthMiddleware from "./auth";

import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import { getAudio } from "./controllers";
import MakeExpressCallback from "./expressCallback";

const auth = buildAuthMiddleware(envConfig);

const app = express();

const port = envConfig.PORT;

// create tempAudio folder if it doens't exist
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

const corsOptions = cors({
  credentials: true,
  // origin: "*",
  origin: envConfig["PUBLIC_PATH"],
  maxAge: parseInt(envConfig["TIMETOLIVE"], 10),
});

app.options(envConfig["PUBLIC_PATH"], corsOptions);
app.use(corsOptions);

app.use(cookieParser(envConfig["COOKIE_SECRET"]));

app.post(
  `${envConfig["API_ROOT"]}/audio/generate`,
  auth.checkSignIn,
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
