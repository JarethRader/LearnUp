// @ts-ignore
const buildGetWhiteboards = (
  // getOwnWhiteboards,
  // getSharedWhiteboards,
  findOneByID: any
) => {
  const getWhiteboards = async (
    request: ExpressHttpRequest
  ): Promise<IController> => {
    console.log("Finding whiteboard");
    try {
      // const ownWhiteboards = await getOwnWhiteboards(request.params.id);
      // const sharedWhiteboards = await getSharedWhiteboards(request.params.id);
      const whiteboards = await findOneByID(request.params.id);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          // ownWhiteboards,
          // sharedWhiteboards,
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
