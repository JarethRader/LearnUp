const generateAudioHelper = (body: any, API: string, CSRFConfig: any) => {
  return new Promise<ArrayBuffer>(async (resolve, reject) => {
    await fetch(API + "/audio/generate", {
      method: "POST",
      // credentials: "include",
      headers: CSRFConfig() as any,
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        if (response.status === 400) {
          throw new Error("Failed to generate audio");
        }
        return await response.arrayBuffer();
      })
      .then((buffer) => {
        resolve(buffer);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  });
};

export default generateAudioHelper;
