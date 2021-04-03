const buildMakeWhiteboardDB = (
  DB: Readonly<{
    WhiteboardSchema: SchemaType;
    LayoutSchema: SchemaType;
    TileSchema: SchemaType;
    CollectionTileSchema: SchemaType;
  }>,
  Id: {
    makeId: () => string;
    isValidId: (id: string) => boolean;
  }
) =>
  Object.freeze({
    insert: async (whiteboardInput: IWhiteboardObject, layout: ITileList[]) => {
      const data = whiteboardInput.toObject();
      try {
        // @ts-ignore
        DB.WhiteboardSchema.create({
          w_id: data.whiteboard_id,
          bn: data.boardName,
          ar: data.author,
          au: data.audience,
          createdAt: data.createdOn,
          updatedAt: data.modifiedOn,
        }).then((newWhiteboard) => {
          // @ts-ignore
          DB.LayoutSchema.create({
            l_id: data.layout.layout_id,
            w_id: data.whiteboard_id,
            bx: data.layout.boundingRect.x,
            by: data.layout.boundingRect.y,
            bw: data.layout.boundingRect.width,
            bh: data.layout.boundingRect.height,
          }).then((newLayout) => {
            layout.forEach(async (tile) => {
              // @ts-ignore
              await DB.CollectionTileSchema.create({
                c_id: Id.makeId(),
                p_id: newLayout.getDataValue("l_id"),
                t_id: tile.uid,
                dx: tile.delta.x,
                dy: tile.delta.y,
              });
            });
          });
        });
      } catch (err) {
        console.log("Something went wrong");
      }
    },
  });

export default buildMakeWhiteboardDB;
