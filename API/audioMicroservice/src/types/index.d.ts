import { Request, Response, NextFunction } from "express";

declare global {
  // TODO: It might be a good idea to format and remove unnecessary data from the request on the client-side before it is sent to the server
  interface IRequestTile {
    tile_id: string;
    uid: string;
    tile: {
      letters: string;
      color: string;
    };
    delta: {
      x: number;
      y: number;
    };
  }

  interface ITile {
    index: number;
    tile: {
      letters: string;
    };
  }

  interface ILetters {
    letters: string;
  }

  type BuildGenerateAudio = (
    extractLetters: (tileList: IRequestTile[]) => string[],
    generateTempFile: () => fs.WriteStream,
    appendAudioFiles: (
      letterList: string[],
      fileStream: fs.WriteStream
    ) => Promise<boolean>,
    sortTiles: (tileList: IRequestTile[]) => IRequestTile[]
  ) => (tileList: IRequestTile[]) => Promise<string>;

  interface IControllerReponse {
    headers: {
      "Content-Type": string;
      "Accepted-Ranges": string;
    };
    statusCode: number;
    audioFile: string;
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

  type BuildGetAudio = (
    generateAudio: (tileList: IRequestTile[]) => Promise<string>
  ) => (request: ExpressHttpRequest) => Promise<IContoller>;

  interface ExpressHttpRequest {
    body: { tiles: IRequestTile[] };
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
  ) => (req: Request, res: Response, next: NextFunction) => any;

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
