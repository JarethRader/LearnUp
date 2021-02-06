import express from 'express';
import {
  postWhiteboard,
  patchWhiteboard,
  deleteWhiteboard,
  getWhiteboards,
} from './controllers';
import makeCallback from './express-callback';
import envConfig from './env';

import morgan from 'morgan';
import helmet from 'helmet';

const app = express();

const port = process.env.PORT || 6000;

// http request logger
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

// Whiteboard CRUD
// post new state
app.post(`${envConfig['API_ROOT']}/whiteboard`, makeCallback(postWhiteboard));
// update existing state
app.patch(
  `${envConfig['API_ROOT']}/whiteboard/:id`,
  makeCallback(patchWhiteboard)
);
// get whiteboard states
app.get(
  `${envConfig['API_ROOT']}/whiteboard/:id`,
  makeCallback(getWhiteboards)
);
// delete state
app.delete(
  `${envConfig['API_ROOT']}/whiteboard/:id`,
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
    res.status(500).send({ error: 'An unknown error occurred.' });
  }
);

app.listen(port, () => console.log(`Whiteboard API running on port ${port}`));

export default app;
