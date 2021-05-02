const buildPostUser: BuildPostUser = (addUser) => {
  const postUser = async (
    request: ExpressHttpRequest
  ): Promise<IController> => {
    try {
      const user = await addUser({ ...request.body })
        .then((newUser) => newUser)
        .catch((err) => {
          throw err;
        });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: { user },
        session: {
          userID: user?._id,
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
      };
    }
  };

  return postUser;
};

export default buildPostUser;
