const getOutput = (whiteboard: any) => {
  let boardState: any = [];
  whiteboard.boardState.map((element: any) => {
    const tempElement = {
      index: element.index,
      tile: element.tile,
      deltaPosition: element.deltaPosition,
    };
    boardState = [...boardState, tempElement];
  });

  return {
    author: whiteboard.author,
    audience: whiteboard.audience,
    boardState,
  };
};

export default getOutput;
