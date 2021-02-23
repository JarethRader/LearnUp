import { Request, Response, NextFunction } from "express";

declare global {
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
    extractLetters: (tileList: ITile[]) => string[],
    generateTempFile: () => fs.WriteStream,
    appendAudioFiles: (
      letterList: string[],
      fileStream: fs.WriteStream
    ) => Promise<boolean>
  ) => (tileList: ITile[]) => Promise<string>;

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
    generateAudio: (tileList: ITile[]) => Promise<string>
  ) => (request: ExpressHttpRequest) => Promise<IContoller>;

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
