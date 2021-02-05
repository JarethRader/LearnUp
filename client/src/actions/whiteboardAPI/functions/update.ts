export const updateHelper = (
  boardID: string,
  whiteboardInfo: IWhiteboardInfoObj,
  API: string,
  CSRFConfig: any
) => {
  return new Promise<WhiteboardResponse>(async (resolve, reject) => {
    await fetch(API + `/whiteboard/${boardID}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: CSRFConfig() as any,
      body: JSON.stringify(whiteboardInfo),
    })
      .then((response) => {
        response.status === 200 && resolve(response.json());
      })
      .catch((err) => {
        reject(new Error(err.message));
      });
  });
};

export default updateHelper;
