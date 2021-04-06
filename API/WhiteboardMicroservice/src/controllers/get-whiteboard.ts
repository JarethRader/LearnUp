// @ts-ignore
const buildGetWhiteboards = (findOneByID: any) => {
  const getWhiteboards = async (
    request: ExpressHttpRequest
  ): Promise<IController> => {
    try {
      const whiteboards = await findOneByID(request.params.id);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          // @ts-ignore
          whiteboards,
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
  return getWhiteboards;
};

export default buildGetWhiteboards;
