const buildPostWhiteboard: BuildPostWhiteboard = (addWhiteboard) => {
  const postWhiteboard = async (
    request: ExpressHttpRequest
  ): Promise<IController> => {
    try {
      const newWhiteboard = await addWhiteboard({ ...request.body });
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        body: { whiteboard: newWhiteboard },
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
  return postWhiteboard;
};

export default buildPostWhiteboard;
