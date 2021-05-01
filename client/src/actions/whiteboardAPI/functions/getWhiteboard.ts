export const getWhiteboardHelper = (
  whiteboardID: string,
  API: string,
  CSRFConfig: any
) => {
  return new Promise<GetWhiteboardResponse>(async (resolve, reject) => {
    await fetch(API + `/whiteboard/${whiteboardID}`, {
      method: "GET",
      credentials: "include",
      // headers: CSRFConfig() as any,
    })
      .then(async (response) => {
        response.status === 400 && reject(await response.json());
        resolve(response.json());
      })
      .catch((err) => {
        reject(new Error(err.message));
      });
  });
};

export default getWhiteboardHelper;
