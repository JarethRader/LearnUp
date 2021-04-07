import makeWhiteboard from "../whiteboard";

const format = (data: any) => {
  const whiteboard = data.get();
  const layout = whiteboard.Layout.get();
  const formated = {
    whiteboard_id: whiteboard.w_id,
    author: whiteboard.ar,
    audience: whiteboard.au,
    boardName: whiteboard.bn,
    tiles: whiteboard.Whiteboard_Tiles.map((tile: any) => ({
      uid: tile.get().t_id,
      tile: {
        letters: tile.Tile.get().l,
        color: tile.Tile.get().c,
      },
      delta: {
        x: tile.get().dx,
        y: tile.get().dy,
      },
    })),
    layout: {
      layout_id: layout.l_id,
      boundingRect: {
        x: layout.bx,
        y: layout.by,
        width: layout.bw,
        height: layout.bh,
      },
      tiles: layout.Layout_Tiles.map((tile: any) => ({
        uid: tile.get().t_id,
        tile: {
          letters: tile.Tile.get().l,
          color: tile.Tile.get().c,
        },
        delta: {
          x: tile.get().dx,
          y: tile.get().dy,
        },
      })),
    },
  };

  return formated;
};

// @ts-ignore
const buildEditWhiteboard = (whiteboardDB) => {
  const editWhiteboard = async (id: string, updatedInfo: IMakeWhiteboard) => {
    const whiteboardInstance = await whiteboardDB();

    const whiteboard = await whiteboardInstance.findOneById(id);

    const changes: IMakeWhiteboard = makeWhiteboard({
      ...format(whiteboard),
      ...updatedInfo,
    }).toObject();

    const updatedWhiteboard =
      whiteboardInstance && (await whiteboardInstance.update(id, changes));

    return updatedWhiteboard;
  };
  return editWhiteboard;
};

export default buildEditWhiteboard;
