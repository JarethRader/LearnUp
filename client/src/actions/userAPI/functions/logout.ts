export const LogoutHelper = (API: string, CSRFConfig: any) => {
  return new Promise<boolean>(async (resolve, reject) => {
    await fetch(API + `/user/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: CSRFConfig() as any,
    })
      .then((response) => {
        response.status === 200 && resolve(true);
      })
      .catch((err: Error) => {
        reject(new Error(err.message));
      });
  });
};
