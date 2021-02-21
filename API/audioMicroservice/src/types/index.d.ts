import { promises } from "fs";

declare module "unique-filename";

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
    ) => Promise<any>
  ) => (tileList: ITile[]) => Promise<any>;
}

export {};
