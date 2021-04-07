import Id from "../Id";

const formatUtils = Object.freeze({
  format: (data: any) => {
    try {
      const whiteboard = data.get();
      const layout = whiteboard.Layout.get();
      const formated = {
        whiteboard_id: whiteboard.w_id,
        author: whiteboard.ar,
        audience: whiteboard.au,
        boardName: whiteboard.bn,
        tiles: whiteboard.Whiteboard_Tiles.map((tile: any) => ({
          uid: tile.get().c_id,
          tile_id: tile.get().t_id,
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
            uid: tile.get().c_id,
            tile_id: tile.get().t_id,
            tile: {
              letters: tile.get().Tile.get().l,
              color: tile.get().Tile.get().c,
            },
            delta: {
              x: tile.get().dx,
              y: tile.get().dy,
            },
          })),
        },
      };

      return formated;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to update");
    }
  },
});

export default formatUtils;
