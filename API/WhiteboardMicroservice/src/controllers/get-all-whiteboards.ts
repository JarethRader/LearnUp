// @ts-ignore
const buildGetAllWhiteboards = (
  getOwnWhiteboards: any,
  getSharedWhiteboards: any
) => {
  // @ts-ignore
  const getAllWhiteboards = async (request) => {
    try {
      const ownWhiteboards = await getOwnWhiteboards(request.params.userid);
      const sharedWhiteboards = await getSharedWhiteboards(
        request.params.userid
      );

      return {
        headers: {
          "Content-Type": "application/json",
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
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: err.message,
        },
      };
    }
  };
  return getAllWhiteboards;
};

export default buildGetAllWhiteboards;
