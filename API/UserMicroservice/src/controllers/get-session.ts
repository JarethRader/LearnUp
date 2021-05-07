const buildGetSession: BuildGetListUser = (listUser) => {
  const GetSession = async (
    request: ExpressHttpRequest
  ): Promise<IController> => {
    try {
      // @ts-ignore
      const listedUser = await listUser(request!.session.userID);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          user: listedUser,
        },
      };
    } catch (err) {
      console.error(err);
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
  return GetSession;
};

export default buildGetSession;
