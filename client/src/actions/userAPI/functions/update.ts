export const UpdateHelper = (
  updateInfo: UpdateUserInfoObj,
  userID: string,
  API: string,
  CSRFConfig: any
) => {
  return new Promise<UserResponse>(async (resolve, reject) => {
    await fetch(API + `/user/${userID}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: CSRFConfig() as any,
      body: JSON.stringify(updateInfo),
    })
      .then((response) => {
        response.status < 400 && resolve(response.json());
      })
      .catch((err) => {
        reject(new Error(err.message));
      });
  });
};
