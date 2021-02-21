import fs from "fs";
import { resolve } from "path";

/**
 *
 * @param extractLetters take in list of tiles { index: number, tile: { letters: string } } and return a string[] of just the letters
 * @param generateFileName will generate a unique file name for the temporary audio file
 * @param appendAudioFiles will take in the lettersList and the tmp audio file filename and recurrsively append all necessary audio filkes to the tmp file. Will return the filename for the tmp audio file
 */

const buildGenerateAudio: BuildGenerateAudio = (
  extractLetters,
  generateTempFile,
  appendAudioFiles
) => {
  const generateAudio = async (tileList: ITile[]) => {
    const letters = extractLetters(tileList);

    // generate the temp audio file we will be sending back to the client (this variable will hold a string of the filename we generated)
    const uniqueFileName = generateTempFile();
    // start write fileStream
    const fileStream = fs.createWriteStream(uniqueFileName);

    while (letters.length) {
      try {
        // @ts-ignore
        await appendAudioFiles(letters.shift(), fileStream).catch(
          (err: Error) => {
            throw new Error(err.message);
          }
        );
      } catch (err) {
        console.log(err);
        throw new Error("Failed to generate audio");
      }
    }
    fileStream.end("Done");

    return uniqueFileName;
  };
  return generateAudio;
};

export default buildGenerateAudio;
