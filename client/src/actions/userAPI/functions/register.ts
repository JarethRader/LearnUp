export const RegisterHelper = (
  registrationInfo: UserInfoObj,
  API: string,
  CSRFConfig: any
) => {
  return new Promise<UserResponse>(async (resolve, reject) => {
    await fetch(API + "/user", {
      method: "POST",
      credentials: "include",
      headers: CSRFConfig() as any,
      body: JSON.stringify(registrationInfo),
    })
      .then(async (response: any) => {
        response.status === 201 && resolve(response.json());
        if (response.status === 400) {
          reject(await response.json());
        }
      })
      .catch((err: Error) => {
        reject(new Error(err.message));
      });
  });
};
