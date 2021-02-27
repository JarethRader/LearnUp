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
      .then((response: any) => {
        response.status === 201 && resolve(response.json());
        if (response.status === 400) {
          console.log(response.json());
          throw new Error();
        }
      })
      .catch((err: Error) => {
        // console.log("Error", err);
        reject(new Error(err.message));
      });
  });
};
