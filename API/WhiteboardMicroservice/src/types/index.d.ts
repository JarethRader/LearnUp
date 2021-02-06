import { Document, Model, Request, Response, NextFunction } from 'mongoose';

export {};

declare global {
  // types for whiteboard object
  type MakeWhiteboard = (userInput: IMakeWhiteboard) => IWhiteboardObject;

  interface IMakeWhiteboard {
    [key: string]: any;
    _id?: string;
    author?: string;
    audience?: string;
    boardState?: IWordList[];
    createdOn?: number;
    modifiedOn?: number;
  }

  interface IWhiteboardObject {
    getId: () => string;
    getAuthor: () => string;
    getAudience: () => string;
    getBoardState: () => IWordList[];
    getCreatedOn: () => number;
    getModifiedOn: () => number;
    toObject: () => IMakeWhiteboard;
  }

  // Whiteboard mongodb schema types
  interface ITile {
    letters: string;
    color: string;
  }

  interface IWordList {
    index: number;
    tile: ITile;
    deltaPosition: {
      x: number;
      y: number;
    };
  }

  interface IWhiteboard {
    author: string;
    audience: string;
    boardState: IWordList[];
  }

  interface IWhiteboardModel extends IWhiteboard, Document {}

  type DBModel = Model<IMakeWhiteboard>;

  type WhiteboardDB = Readonly<{
    insert: (whiteboardInfo: any) => Promise<IWhiteboardModel>;
    remove: (id: string) => Promise<any>;
    update: (id: String, updatedInfo: IMakeWhiteboard) => Promise<any>;
    findOneById: (id: string) => Promise<any>;
    findByAuthor: (id: string) => Promise<any>;
    findByAudience: (userID: string) => Promise<any>;
  }>;
  type MakeDB = (
    WhiteboardSchema: Mongoose.Model<IWhiteboardModel>
  ) => WhiteboardDB;

  type BuildAddWhiteboard = (
    whiteboardDB: () => Promise<WhiteboardDB>
  ) => (
    whiteboardInfo: IMakeWhiteboard
  ) => Promise<IWhiteboardModel | undefined>;

  type BuildEditWhiteboard = (
    whiteboardDB: () => Promise<WhiteboardDB>
  ) => (
    id: string,
    updatedInfo: IMakeWhiteboard
  ) => Promise<IWhiteboardModel | undefined>;

  type BuildRemoveWhiteboard = (
    whiteboardDB: () => Promise<WhiteboardDB>
  ) => (id: string) => Promise<IWhiteboardModel | undefined>;

  type BuildListWhiteboards = (
    whiteboardDB: () => Promise<WhiteboardDB>
  ) => (userID: string) => Promise<IWhiteboardModel[] | undefined>;

  // Controllers
  interface IWhiteboardList {
    ownWhiteboards: IWhiteboardModel[] | undefined;
    sharedWhiteboards: IWhiteboardModel[] | undefined;
  }

  interface IControllerResponse {
    headers: {
      'Content-Type': string;
    };
    statusCode: number;
    body:
      | {
          whiteboard: IWhiteboardModel | undefined;
        }
      | IWhiteboardList;
  }

  interface IControllerError {
    headers: {
      'Content-Type': string;
    };
    statusCode: number;
    body: {
      error: string | undefined;
    };
  }

  type IController = IControllerResponse | IControllerError;

  type BuildPostWhiteboard = (
    addWhiteboard: (
      whiteboardInfo: IMakeWhiteboard
    ) => Promise<IWhiteboardModel | undefined>
  ) => (request: ExpressHttpRequest) => Promise<IController>;

  type BuildGetWhiteboard = (
    getOwnWhiteboards: (
      userID: string
    ) => Promise<IWhiteboardModel[] | undefined>,
    getSharedWhiteboards: (
      userID: string
    ) => Promise<IWhiteboardModel[] | undefined>
  ) => (request: ExpressHttpRequest) => Promise<IController>;

  type BuildPatchWhiteboard = (
    editWhiteboard: (
      id: string,
      updateInfo: IMakeWhiteboard
    ) => Promise<IWhiteboardModel | undefined>
  ) => (request: ExpressHttpRequest) => Promise<IController>;

  type BuildDeleteWhiteboard = (
    removeWhiteboard: (id: string) => Promise<IWhiteboardModel | undefined>
  ) => (request: ExpressHttpRequest) => Promise<IController>;

  // Express
  // Express callback
  interface ExpressHttpRequest {
    body: any;
    query?: QueryString.ParsedQs;
    params?: ParamsDictionary;
    ip?: string;
    method?: string;
    path?: string;
    headers: {
      'Content-Type': string | undefined;
      Referer?: string;
      'User-Agent'?: string;
    };
  }

  type MakeExpressCallback = (
    controller: (request: ExpressHttpRequest) => Promise<IController>
  ) => (req: Request, res: Response, next: NextFunction) => void;

  type BuildCookieConfig = (
    envConfig: dotenv.DotenvParseOutput
  ) => {
    [key: string]: any;
    maxAge: number;
    sameSite: boolean;
    secure: boolean;
  };
}

export {};
