export const deleteHelper = (userID: string, API: string, CSRFConfig: any) => {
  return new Promise<boolean>(async (resolve, reject) => {
    await fetch(API + `/user/${userID}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: CSRFConfig() as any,
    })
      .then((response) => {
        response.status === 200 && resolve(true);
      })
      .catch((err) => {
        reject(new Error(err.message));
      });
  });
};
