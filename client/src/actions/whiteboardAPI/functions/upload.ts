export const uploadHelper = (
  whiteboardInfo: IWhiteboardInfoObj,
  API: string,
  CSRFConfig: any
) => {
  return new Promise<WhiteboardResponse>(async (resolve, reject) => {
    await fetch(API + '/whiteboard', {
      method: 'POST',
      credentials: 'include',
      headers: CSRFConfig() as any,
      body: JSON.stringify(whiteboardInfo),
    })
      .then((response) => {
        response.status === 201 && resolve(response.json());
      })
      .catch((err) => {
        reject(new Error(err.message));
      });
  });
};

export default uploadHelper;
