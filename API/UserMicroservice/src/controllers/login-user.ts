const buildLoginUser = (
  authenticate: (
    email: string,
    password: string
  ) => Promise<string | undefined>,
  listUser: (id: string) => Promise<IUserModel | undefined>
) => {
  const LoginUser = async (
    request: ExpressHttpRequest
  ): Promise<IController> => {
    try {
      // validPassword will be the userID if passwords match, and undefined if passwords don't match
      const validPassword = await authenticate(
        request.body.email,
        request.body.password
      )
        .then((userID) => {
          if (!userID) {
            throw new Error("Invalid password");
          }
          return userID;
        })
        .catch((err) => {
          throw new Error(err);
        });
      const user =
        validPassword !== undefined ? await listUser(validPassword) : undefined;

      return {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin":
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000"
              : "https://phonetics-learnup.com",
          "Access-Control-Allow-Credentials": "true",
        },
        statusCode: 201,
        body: { user },
        session: {
          accessToken: validPassword,
        },
      };
    } catch (err) {
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: err.message,
        },
        session: {
          destroy: true,
        },
      };
    }
  };

  return LoginUser;
};

export default buildLoginUser;
