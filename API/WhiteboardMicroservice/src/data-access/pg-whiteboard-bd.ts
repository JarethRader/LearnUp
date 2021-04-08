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
  },
  Operations: {
    inBoth: (tileList1: ITileList[], tileList2: ITileList[]) => ITileList[];
    inFirstOnly: (
      tileList1: ITileList[],
      tileList2: ITileList[]
    ) => ITileList[];
    inSecondOnly: (
      tileList1: ITileList[],
      tileList2: ITileList[]
    ) => ITileList[];
  }
) =>
  Object.freeze({
    insert: async (whiteboardInput: IMakeWhiteboard, layout: ITileList[]) => {
      const data = whiteboardInput;
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
                t_id: tile.tile_id,
                dx: tile.delta.x,
                dy: tile.delta.y,
              });
            });
          });

          data.tiles &&
            data.tiles.forEach(async (tile: any) => {
              // @ts-ignore
              await DB.WhiteboardTileSchema.create({
                c_id: Id.makeId(),
                p_id: newWhiteboard.getDataValue("w_id"),
                t_id: tile.tile_id,
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
        // @ts-ignore
        DB.WhiteboardSchema.findOne({
          where: { w_id: data.whiteboard_id },
        }).then((whiteboard) => {
          whiteboard.destroy();
        });
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
    update: async (whiteboardID: string, updateInfo: any) => {
      try {
        // @ts-ignore
        await DB.WhiteboardSchema.findOne({
          where: { w_id: whiteboardID },
        })
          .then(async (whiteboard) => {
            whiteboard.update({
              w_id: updateInfo.boardName,
              ar: updateInfo.author,
              au: updateInfo.audience,
            });
            // @ts-ignore
            await DB.LayoutSchema.findOne({
              where: { w_id: whiteboardID },
            })
              .then((layout) => {
                layout.update({
                  bx: updateInfo.layout.boundingRect.x,
                  by: updateInfo.layout.boundingRect.y,
                  bw: updateInfo.layout.boundingRect.width,
                  bh: updateInfo.layout.boundingRect.height,
                });

                whiteboard.save();
                layout.save();

                return {
                  whiteboard_ID: whiteboard.get().w_id,
                  boardName: whiteboard.get().bn,
                  author: whiteboard.get().ar,
                  audience: whiteboard.get().au,
                };
              })
              .catch((err) => {
                throw err;
              });

            // @ts-ignore
            await DB.WhiteboardTileSchema.findAll({
              where: { p_id: whiteboard.getDataValue("w_id") },
              include: [DB.TileSchema],
            }).then(async (whiteboardTiles) => {
              const wb_tiles = whiteboardTiles.map((tile) => ({
                uid: tile.getDataValue("c_id"),
                tile_id: tile.getDataValue("t_id"),
                delta: {
                  x: tile.getDataValue("dx"),
                  y: tile.getDataValue("dy"),
                },
                tile: {
                  // @ts-ignore
                  letters: tile.Tile.getDataValue("l"),
                  // @ts-ignore
                  color: tile.Tile.getDataValue("c"),
                },
              }));

              // update or do nothing
              const inBoth = Operations.inBoth(updateInfo.tiles, wb_tiles);
              inBoth.forEach(async (bothTile) => {
                // @ts-ignore
                await DB.WhiteboardTileSchema.findOne({
                  where: { c_id: bothTile.uid },
                })
                  .then((updateTile) => {
                    updateTile.getDataValue("dx") !== bothTile.delta.x &&
                      updateTile.update({
                        dx: Math.round(bothTile.delta.x),
                      });
                    updateTile.getDataValue("dy") !== bothTile.delta.y &&
                      updateTile.update({
                        dy: Math.round(bothTile.delta.y),
                      });

                    updateTile.save();
                  })
                  .catch((err) => {
                    throw err;
                  });
              });

              // add
              const inUpdate = Operations.inFirstOnly(
                updateInfo.tiles,
                wb_tiles
              );
              inUpdate.forEach(
                async (tile) =>
                  // @ts-ignore
                  await DB.WhiteboardTileSchema.create({
                    c_id: Id.makeId(),
                    p_id: whiteboard.getDataValue("w_id"),
                    t_id: tile.tile_id,
                    dx: Math.round(tile.delta.x),
                    dy: Math.round(tile.delta.y),
                  }).catch((err) => {
                    throw err;
                  })
              );

              // delete
              const inDB = Operations.inSecondOnly(updateInfo.tiles, wb_tiles);
              inDB.forEach(async (DBTile) => {
                // @ts-ignore
                await DB.WhiteboardTileSchema.findOne({
                  where: { c_id: DBTile.uid },
                })
                  .then((destroyTile) => destroyTile.destroy())
                  .catch((err) => {
                    throw err;
                  });
              });
            });
          })
          .catch((err) => {
            throw err;
          });
      } catch (err) {
        console.log(err);
      }
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
          {
            model: DB.WhiteboardTileSchema,
            include: DB.TileSchema,
          },
        ],
      })
        .then((whiteboard: any) =>
          whiteboard ? whiteboard : "Whiteboard not found"
        )
        .catch((err) => "Got error while trying to find whiteboard");
    },
    findByAuthor: async (userID: string) => {
      // @ts-ignore
      return await DB.WhiteboardSchema.findAll({
        where: { ar: userID },
      })
        .then(
          (whiteboards) =>
            whiteboards.length > 0 && whiteboards.map((board) => board.get())
        )
        .catch((err) => "Failed to find you whiteboards");
    },
    findByAudience: async (userID: string) => {
      // @ts-ignore
      return await DB.WhiteboardSchema.findAll({
        where: { au: userID },
      })
        .then(
          (whiteboards) =>
            whiteboards.length > 0 && whiteboards.map((board) => board.get())
        )
        .catch((err) => "Failed to find you whiteboards");
    },
  });
export default buildMakeWhiteboardDB;
