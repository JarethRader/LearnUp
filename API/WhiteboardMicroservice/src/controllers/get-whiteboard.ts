const buildGetWhiteboards: BuildGetWhiteboard = (
  getOwnWhiteboards,
  getSharedWhiteboards
) => {
  const getWhiteboards = async (
    request: ExpressHttpRequest
  ): Promise<IController> => {
    try {
      const ownWhiteboards = await getOwnWhiteboards(request.params.id);
      const sharedWhiteboards = await getSharedWhiteboards(request.params.id);

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: {
          ownWhiteboards,
          sharedWhiteboards,
        },
      };
    } catch (err) {
      return {
        headers: {
          'Content-Type': 'application/json',
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
