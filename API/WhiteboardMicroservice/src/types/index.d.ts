import { Document, Request, Response, NextFunction } from "mongoose";
import { Sequelize, DataTypes, Model, BuildOptions } from "sequelize";

declare global {
  // types for whiteboard object
  type MakeWhiteboard = (input: IMakeWhiteboard) => IWhiteboardObject;

  interface IMakeWhiteboard {
    [key: string]: any;
    whiteboard_id?: string;
    boardName: string;
    author: string;
    audience?: string;
    layouts: [
      {
        layout_id: string;
        boundingRect: {
          x: number;
          y: number;
          width: number;
          height: number;
        };
      }
    ];
    boardType: "default" | "beginner";
    createdOn?: number;
    modifiedOn?: number;
  }

  interface IWhiteboardObject {
    getId: () => string;
    getName: () => string;
    getAuthor: () => string;
    getAudience: () => string;
    getCreatedOn: () => number;
    getModifiedOn: () => number;
    toObject: () => IMakeWhiteboard;
  }

  // Whiteboard mongodb schema types
  interface ITile {
    letters: string;
    color: string;
  }

  interface ITileList {
    uid: string;
    tile_id: string;
    tile: ITile;
    delta: {
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
    insert: (
      whiteboardInput: IMakeWhiteboard,
      layouts: ITileList[][]
    ) => Promise<Whiteboard>;
    remove: (whiteboardID: string) => Promise<void>;
    update: (whiteboardID: string, updateInfo: any) => Promise<void>;
    findOneById: (whiteboardID: string) => Promise<Whiteboard>;
    findByAuthor: (userID: string) => Promise<Whiteboard[]>;
    findByAudience: (userID: string) => Promise<Whiteboard[]>;
  }>;

  type TMakeDB = (
    DB: Readonly<{
      WhiteboardSchema: SchemaType;
      LayoutSchema: SchemaType;
      TileSchema: SchemaType;
      LayoutTileSchema: SchemaType;
      WhiteboardTileSchema: SchemaType;
    }>,
    Id: {
      makeId: () => string;
      isValidId: (id: string) => boolean;
    },
    Operations: {
      inBoth: (tileList1: ITileList[], tileList2: ITileList[]) => ITileList[];
      inFirstOnly: (
        tileList1: ITileList[],
        tileList2: ITileList[]
      ) => ITileList[];
      inSecondOnly: (
        tileList1: ITileList[],
        tileList2: ITileList[]
      ) => ITileList[];
    }
  ) => WhiteboardDB;

  // postgres sequelize types
  type DT = typeof DataTypes;

  interface Whiteboard extends Model {
    readonly w_id: string;
    readonly bn: string;
    readonly ar: string;
    readonly au: string;
    readonly layoutID: string;

    readonly createdAt: Date;
    readonly updatedAt: Date;
  }
  type WhiteboardStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Whiteboard;
  };

  interface layout extends Model {
    readonly l_id: string;
    readonly bx: number;
    readonly by: number;
    readonly bw: number;
    readonly bh: number;
    readonly w_id: number;

    readonly createdAt: Date;
    readonly updatedAt: Date;
  }
  type LayoutStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): layout;
  };

  interface Tile extends Model {
    readonly t_id: string;
    readonly l: string;
    readonly c: string;

    readonly createdAt: Date;
    readonly updatedAt: Date;
  }
  type TilesStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Tile;
  };

  interface CollectionTile extends Model {
    readonly c_id: string;
    readonly p_id: string;
    readonly t_id: string;
    readonly dx: number;
    readonly dy: number;

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
    whiteboardDB: () => WhiteboardDB
  ) => (whiteboardInfo: IMakeWhiteboard) => Promise<IWhiteboardModel>;

  type BuildEditWhiteboard = (
    whiteboardDB: () => WhiteboardDB,
    formatUtils: Readonly<{
      format: (
        data: any
      ) => {
        whiteboard_id: any;
        author: any;
        audience: any;
        boardName: any;
        tiles: any;
        layout: {
          layout_id: any;
          boundingRect: {
            x: any;
            y: any;
            width: any;
            height: any;
          };
          tiles: any;
        };
      };
    }>
  ) => (id: string, updatedInfo: IMakeWhiteboard) => Promise<IWhiteboardModel>;

  type BuildRemoveWhiteboard = (
    whiteboardDB: () => WhiteboardDB
  ) => (id: string) => Promise<IWhiteboardModel>;

  type BuildListWhiteboards = (
    whiteboardDB: () => WhiteboardDB
  ) => (userID: string) => Promise<IWhiteboardModel[]>;

  type BuildListOneWhiteboard = (
    whiteboardDB: () => WhiteboardDB
  ) => (userID: string) => Promise<IWhiteboardMode>;

  // Controllers
  interface IWhiteboardList {
    ownWhiteboards: IWhiteboardModel[];
    sharedWhiteboards: IWhiteboardModel[];
  }

  interface IControllerResponse {
    headers: {
      "Content-Type": string;
    };
    statusCode: number;
    body:
      | {
          whiteboard: IWhiteboardModel;
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
    ) => Promise<IWhiteboardModel>
  ) => (request: ExpressHttpRequest) => Promise<IController>;

  type BuildGetWhiteboard = (
    getOwnWhiteboards: (userID: string) => Promise<IWhiteboardModel[]>,
    getSharedWhiteboards: (userID: string) => Promise<IWhiteboardModel[]>
  ) => (request: ExpressHttpRequest) => Promise<IController>;

  type BuildPatchWhiteboard = (
    editWhiteboard: (
      id: string,
      updateInfo: IMakeWhiteboard
    ) => Promise<IWhiteboardModel>
  ) => (request: ExpressHttpRequest) => Promise<IController>;

  type BuildDeleteWhiteboard = (
    removeWhiteboard: (id: string) => Promise<IWhiteboardModel>
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
