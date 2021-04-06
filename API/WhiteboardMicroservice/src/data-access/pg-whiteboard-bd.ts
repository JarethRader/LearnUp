const buildMakeWhiteboardDB = (
  DB: Readonly<{
    WhiteboardSchema: SchemaType;
    LayoutSchema: SchemaType;
    TileSchema: SchemaType;
    LayoutTileSchema: SchemaType;
    WhiteboardTileSchema: SchemaType;
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
        return await DB.WhiteboardSchema.create({
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
              await DB.LayoutTileSchema.create({
                c_id: Id.makeId(),
                p_id: newLayout.getDataValue("l_id"),
                t_id: tile.uid,
                dx: tile.delta.x,
                dy: tile.delta.y,
              });
            });
          });

          data.tiles.forEach(async (tile: any) => {
            // @ts-ignore
            await DB.WhiteboardTileSchema.create({
              c_id: Id.makeId(),
              p_id: newWhiteboard.getDataValue("w_id"),
              t_id: tile.uid,
              dx: Math.round(tile.delta.x),
              dy: Math.round(tile.delta.y),
            }).catch((err: any) => console.log(err));
          });

          return {
            whiteboard_ID: newWhiteboard.get().w_id,
            boardName: newWhiteboard.get().bn,
            author: newWhiteboard.get().ar,
            audience: newWhiteboard.get().au,
          };
        });
      } catch (err) {
        console.log("Something went wrong: ", err);
        // TODO: I need to delete the inserted documents if an error is thrown here
      }
    },
    remove: async (whiteboardID: string) => {
      // @ts-ignore
      return await DB.WhiteboardSchema.findOne({
        where: { w_id: whiteboardID },
      })
        .then((whiteboard) => {
          whiteboard ? whiteboard.destroy() : "Whiteboard was not found";
        })
        .catch((err) => "Failed to remove whiteboard");
    },
    update: async (updateInfo: any) => {
      // @ts-ignore
      await DB.WhiteboardSchema.findOne({
        where: { w_id: updateInfo.whiteboard },
        include: [
          DB.LayoutSchema,
          {
            model: DB.LayoutSchema,
            include: [
              {
                model: DB.LayoutTileSchema,
                include: [DB.TileSchema],
              },
            ],
          },
          DB.WhiteboardTileSchema,
        ],
      })
        .then((whiteboard) => {
          console.log(whiteboard);
        })
        .catch((err) => console.log("Failed to update whiteboard: ", err));
    },
    findOneById: async (whiteboardID: string) => {
      // @ts-ignore
      return await DB.WhiteboardSchema.findOne({
        where: { w_id: whiteboardID },
        include: [
          DB.LayoutSchema,
          {
            model: DB.LayoutSchema,
            include: [
              {
                model: DB.LayoutTileSchema,
                include: [DB.TileSchema],
              },
            ],
          },
          DB.WhiteboardTileSchema,
        ],
      })
        .then((whiteboard: any) =>
          whiteboard ? whiteboard : "Whiteboard not found"
        )
        .catch((err) => "Got error while trying to find whiteboard");
    },
    findByAuthor: async (authorID: string) => {
      console.log(authorID);
      // @ts-ignore
      return await DB.WhiteboardSchema.findAll({
        where: { ar: authorID },
      })
        .then(
          (whiteboards) =>
            whiteboards.length > 0 && whiteboards.map((board) => board.get())
        )
        .catch((err) => "Failed to find you whiteboards");
    },
    findByAudience: async (authorID: string) => {
      console.log(authorID);
      // @ts-ignore
      return await DB.WhiteboardSchema.findAll({
        where: { au: authorID },
      })
        .then((whiteboards) => {
          const boards = whiteboards.map((board) => board.get());
          boards.length > 0 && boards;
        })
        .catch((err) => "Failed to find you whiteboards");
    },
  });
export default buildMakeWhiteboardDB;
