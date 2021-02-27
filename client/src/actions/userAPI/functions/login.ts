export const LoginHelper = (
  userInfo: UserLoginInfoObj,
  API: string,
  CSRFConfig: any
) => {
  return new Promise<UserResponse>(async (resolve, reject) => {
    await fetch(API + "/user/login", {
      method: "POST",
      credentials: "include",
      headers: CSRFConfig() as any,
      body: JSON.stringify(userInfo),
    })
      .then(async (response: any) => {
        response.status === 201 && resolve(response.json());
        if (response.status === 400) {
          reject(await response.json());
        }
      })
      .catch(async (err: Error) => {
        // reject(new Error(err.message));
        reject(new Error("An unknown error occured"));
      });
  });
};
