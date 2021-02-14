export const findUserHelper = (email: string, API: string, CSRFConfig: any) => {
  return new Promise<UserResponse>(async (resolve, reject) => {
    await fetch(API + `/user/`, {
      method: 'GET',
      credentials: 'include',
      headers: CSRFConfig() as any,
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        response.status === 200 && resolve(response.json());
      })
      .catch((err) => {
        reject(new Error(err.message));
      });
  });
};
