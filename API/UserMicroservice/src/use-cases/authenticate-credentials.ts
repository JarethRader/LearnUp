const buildAuthenticateCredentials = (
  userDb: () => Promise<UserDB>,
  Authenticate: {
    validatePassword(
      givenPassword: string,
      storedPassword: string
    ): Promise<boolean>;
  }
) => {
  const authenticateCredentials = async (email: string, password: string) => {
    return new Promise<string>(async (resolve, reject) => {
      const db = await userDb();
      const user = await db.findOneByEmail(email);
      if (!user) {
        reject("Email is not associated with an account");
      } else {
        const isValid = await Authenticate.validatePassword(
          password,
          user.password
        );
        isValid && resolve(user.id);
        reject("Password was invalid");
      }
    });
  };

  return authenticateCredentials;
};

export default buildAuthenticateCredentials;
