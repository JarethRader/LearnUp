const buildGetAudio = (generateAudio: any) => {
  const GetAudio = async (request: any) => {
    try {
      console.log("Generating audio");
      const audioFile = await generateAudio(request.body.tiles);

      console.log("finished generating");

      return {
        headers: {
          "Accepted-Ranges": "bytes",
          "Content-Type": "audio/mpeg",
        },
        statusCode: 200,
        audioFile: audioFile,
      };
    } catch (err) {
      throw new Error(err);
      // return {
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      //     statusCode: 400,
      //     body: {
      //         error: err.message,
      //     }
      // }
    }
  };
  return GetAudio;
};

export default buildGetAudio;
