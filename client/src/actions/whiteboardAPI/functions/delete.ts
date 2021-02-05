export const deleteHelper = (boardID: string, API: string, CSRFConfig: any) => {
  return new Promise<WhiteboardResponse>(async (resolve, reject) => {
    await fetch(API + `/whiteboard/${boardID}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: CSRFConfig() as any,
    })
      .then((response) => {
        response.status === 200 && resolve(response.json());
      })
      .catch((err) => {
        reject(new Error(err.message));
      });
  });
};

export default deleteHelper;
