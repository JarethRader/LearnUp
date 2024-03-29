/// <reference path='../types/index.d.ts' />

import fs from "fs";
import path from "path";
import { v1 as uuidv1 } from "uuid";

import buildGenerateAudio from "./generate-audio";

const extractLetters = (tileList: IRequestTile[]) => {
  let letterList: string[] = [];
  tileList.map((element: IRequestTile) => {
    letterList = [...letterList, element.tile.letters];
  });
  return letterList;
};

const generateTempFile = () =>
  path.join(__dirname, `../tempAudio/${uuidv1()}.mp3`);

const appendAudioFiles = (letters: string[], fileStream: fs.WriteStream) => {
  return new Promise<boolean>((resolve, reject) => {
    const currentFile = path.join(__dirname, `../audio/${letters}.mp3`);
    const stream = fs.createReadStream(currentFile);
    stream.pipe(fileStream, { end: false });
    stream.on("end", () => {
      resolve(true);
    });
  });
};

const sortTiles = (tileList: IRequestTile[]) =>
  tileList.sort(
    (a, b) =>
      Math.hypot(a.delta.x, a.delta.y) - Math.hypot(b.delta.x, b.delta.y)
  );

const generateAudio = buildGenerateAudio(
  extractLetters,
  generateTempFile,
  appendAudioFiles,
  sortTiles
);

const audioServices = Object.freeze({
  generateAudio,
});

export default audioServices;
export { generateAudio };
