export const getHelper = (userID: string, API: string, CSRFConfig: any) => {
  return new Promise<WhiteboardResponse>(async (resolve, reject) => {
    await fetch(API + `/whiteboard/${userID}`, {
      method: 'GET',
      // credentials: 'include',
      // headers: CSRFConfig() as any,
    })
      .then((response) => {
        console.log(response);
        response.status === 200 && resolve(response.json());
      })
      .catch((err) => {
        reject(new Error(err.message));
      });
  });
};

export default getHelper;
