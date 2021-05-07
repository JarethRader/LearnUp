export const sessionHelper = (API: string, CSRFConfig: any) => {
  return new Promise<UserResponse>(async (resolve, reject) => {
    await fetch(API + "/session/", {
      method: "GET",
      headers: CSRFConfig() as any,
      credentials: "include",
    })
      .then(async (response) => {
        response.status === 200 && resolve(response.json());
        if (response.status === 400) {
          reject(await response.json());
        }
      })
      .catch((err) => {
        reject(new Error("An unknown error occured"));
      });
  });
};
