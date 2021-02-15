export const findUserHelper = (email: string, API: string, CSRFConfig: any) => {
  return new Promise<UserResponse>(async (resolve, reject) => {
    await fetch(API + `/user?email=${email}`, {
      method: 'GET',
      credentials: 'include',
      headers: CSRFConfig() as any,
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
