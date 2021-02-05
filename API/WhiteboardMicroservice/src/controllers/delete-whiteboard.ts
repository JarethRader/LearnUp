const buildDeleteWhiteboard: BuildDeleteWhiteboard = (removeWhiteboard) => {
  const deleteWhiteboard = async (
    request: ExpressHttpRequest
  ): Promise<IController> => {
    try {
      const removedWhiteboard = await removeWhiteboard(request.params.id);

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { whiteboard: removedWhiteboard },
      };
    } catch (err) {
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 400,
        body: {
          error: err.message as string,
        },
      };
    }
  };
  return deleteWhiteboard;
};

export default buildDeleteWhiteboard;
