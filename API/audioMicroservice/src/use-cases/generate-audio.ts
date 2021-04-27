import fs from "fs";

const buildGenerateAudio: BuildGenerateAudio = (
  extractLetters,
  generateTempFile,
  appendAudioFiles,
  sorted
) => {
  const generateAudio = async (tileList: IRequestTile[]) => {
    const sortTiles = sorted(tileList);

    const letters = extractLetters(sortTiles);

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
        throw new Error("Failed to generate audio");
      }
    }
    fileStream.end("Done");

    return uniqueFileName;
  };
  return generateAudio;
};

export default buildGenerateAudio;
