export const getUserHelper = (userID: string, API: string, CSRFConfig: any) => {
  return new Promise<UserResponse>(async (resolve, reject) => {
    await fetch(API + `/user/${userID}`, {
      method: 'GET',
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
