import { Document, Request, Response, NextFunction } from "mongoose";
import { Sequelize, DataTypes, Model, BuildOptions } from "sequelize";

declare global {
  // types for whiteboard object
  type MakeWhiteboard = (input: IMakeWhiteboard) => IWhiteboardObject;

  interface IMakeWhiteboard {
    [key: string]: any;
    _id?: string;
    name?: string;
    author?: string;
    audience?: string;
    boardState?: ITileList[];
    createdOn?: number;
    modifiedOn?: number;
  }

  interface IWhiteboardObject {
    getId: () => string;
    getName: () => string;
    getAuthor: () => string;
    getAudience: () => string;
    getBoardState: () => ITileList[];
    getCreatedOn: () => number;
    getModifiedOn: () => number;
    toObject: () => IMakeWhiteboard;
  }

  type MakeLayout = (input: IMakeLayout) => ILayoutObject;

  interface IMakeLayout {
    [key: string]: any;
    __id?: string;
    layoutRect?: {
      top: number;
      left: number;
      width: number;
      height: number;
    };
    layout?: ITileList[];
    createdOn?: number;
    modifiedOn?: number;
  }

  interface ILayoutObject {
    getId: () => string;
    getLayoutRect: () => {
      top: number;
      left: number;
      width: number;
      height: number;
    };
    getLayout: () => ITileList[];
    getCreatedOn: () => number;
    getModifiedOn: () => number;
    toObject: () => IMakeLayout;
  }

  type MakeLearningSet = (input: IMakeLearningSet) => ILearningSetObject;

  interface IMakeLearningSet {
    [key: string]: any;
    __id?: string;
    tiles: ITileList[];
    createdOn?: number;
    modifiedOn?: number;
  }

  interface ILearningSetObject {
    getId: () => string;
    getTiles: () => ITileList[];
    getCreatedOn: () => number;
    getModifiedOn: () => number;
  }

  // Whiteboard mongodb schema types
  interface ITile {
    letters: string;
    color: string;
  }

  interface ITileList {
    index: number;
    tile: ITile;
    deltaPosition: {
      x: number;
      y: number;
    };
  }

  interface IWhiteboard {
    name: string;
    author: string;
    audience: string;
    boardState: ITileList[];
  }

  // interface IWhiteboardModel extends IWhiteboard, Document {}
  interface IWhiteboardModel extends IWhiteboard {}

  // type DBModel = Model<IMakeWhiteboard>;

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

  // postgres sequelize types
  type DT = typeof DataTypes;

  interface Whiteboard extends Model {
    readonly whiteboardID: string;
    readonly boardName: string;
    readonly author: string;
    readonly audience: string;
    readonly layoutID: string;

    readonly createdAt: Date;
    readonly updatedAt: Date;
  }
  type WhiteboardStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Whiteboard;
  };

  interface layout extends Model {
    readonly layoutID: string;
    readonly boundingX: number;
    readonly boundingY: number;
    readonly boundingWidth: number;
    readonly boundingHeight: number;
    readonly whiteboardID: number;

    readonly createdAt: Date;
    readonly updatedAt: Date;
  }
  type LayoutStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): layout;
  };

  interface Tile extends Model {
    readonly tilesID: string;
    readonly letters: string;
    readonly color: string;

    readonly createdAt: Date;
    readonly updatedAt: Date;
  }
  type TilesStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Tile;
  };

  interface CollectionTile extends Model {
    readonly collectionID: string;
    readonly parentID: string;
    readonly tileID: string;
    readonly deltaX: number;
    readonly deltaY: number;

    readonly createdAt: Date;
    readonly updatedAt: Date;
  }
  type CollectionTileStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): CollectionTile;
  };

  type SchemaType =
    | WhiteboardStatic
    | LayoutStatic
    | TilesStatic
    | CollectionTileStatic;
  type TBuildSchema = (sequelize: Sequelize, DataTypes: DT) => SchemaType;

  // controller types
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
      "Content-Type": string;
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
      "Content-Type": string;
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
      "Content-Type": string | undefined;
      Referer?: string;
      "User-Agent"?: string;
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
