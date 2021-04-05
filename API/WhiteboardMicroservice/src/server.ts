import express from "express";
import {
  postWhiteboard,
  patchWhiteboard,
  deleteWhiteboard,
  getWhiteboards,
} from "./controllers";
import makeCallback from "./express-callback";
import envConfig from "./env";
import setupDB from "./data-access/utils/db-setup";

import buildCookieConfig from "./cookie";

import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const port = process.env.PORT || 5001;

// TODO: I'll need to some database setup here when the server first starts up
// this should drop all tables if they already exist, and then populate the tiles db
// setupDB();

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
  origin: envConfig["PUBLIC_PATH"],
  maxAge: parseInt(envConfig["SESS_LIFETIME"], 10),
});

app.options(envConfig["PUBLIC_PATH"], corsOptions);
app.use(corsOptions);

app.use(cookieParser(envConfig["COOKIE_SECRET"]));

// Whiteboard CRUD
// post new state
app.post(`${envConfig["API_ROOT"]}/whiteboard`, makeCallback(postWhiteboard));
// update existing state
app.patch(
  `${envConfig["API_ROOT"]}/whiteboard/:id`,
  makeCallback(patchWhiteboard)
);
// get whiteboard states
app.get(
  `${envConfig["API_ROOT"]}/whiteboard/:id`,
  makeCallback(getWhiteboards)
);
// delete state
app.delete(
  `${envConfig["API_ROOT"]}/whiteboard/:id`,
  makeCallback(deleteWhiteboard)
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

app.listen(port, () => console.log(`Whiteboard API running on port ${port}`));

export default app;
