const buildGetAudio: BuildGetAudio = (generateAudio) => {
  const GetAudio = async (request: ExpressHttpRequest) => {
    try {
      const audioFile = await generateAudio(request.body.tiles);

      return {
        headers: {
          "Accepted-Ranges": "bytes",
          "Content-Type": "audio/mpeg",
        },
        statusCode: 200,
        audioFile: audioFile,
      };
    } catch (err) {
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: err.message,
        },
      };
    }
  };
  return GetAudio;
};

export default buildGetAudio;
