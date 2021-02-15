const buildPatchWhiteboard: BuildPatchWhiteboard = (editWhiteboard) => {
  const patchWhiteboard = async (
    request: ExpressHttpRequest
  ): Promise<IController> => {
    try {
      const updatedWhiteboard = await editWhiteboard(
        request.params.id,
        request.body
      );
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { whiteboard: updatedWhiteboard },
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
  return patchWhiteboard;
};

export default buildPatchWhiteboard;
