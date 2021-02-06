const makeWhiteboardDb: MakeDB = (whiteboardSchema) =>
  Object.freeze({
    insert: async (whiteboardInfo) => {
      const newWhiteboard: IWhiteboardModel = new whiteboardSchema({
        _id: whiteboardInfo.id || whiteboardInfo._id,
        author: whiteboardInfo.author,
        audience: whiteboardInfo.audience,
        boardState: whiteboardInfo.boardState,
        createdAt: whiteboardInfo.createdOn || whiteboardInfo.createdAt,
        updatedAt: whiteboardInfo.modifiedOn || whiteboardInfo.updatedAt,
      });
      return await newWhiteboard.save().then((whiteboard) => {
        return whiteboard && whiteboard;
      });
    },
    remove: async (id: string) => {
      return await whiteboardSchema
        .findOneAndDelete({ _id: id })
        .catch((err: any) => {
          throw err;
        });
    },
    update: async (id, updatedInfo) => {
      return await whiteboardSchema
        .findOneAndUpdate({ _id: id }, { ...updatedInfo }, { new: true })
        .then((whiteboard: IWhiteboardModel) => {
          if (!whiteboard) {
            throw new Error('Failed to update Whiteboard');
          }
          return whiteboard;
        });
    },
    findOneById: async (id) => {
      return await whiteboardSchema
        .findById(id)
        .then((whiteboard: IWhiteboardModel) => {
          if (!whiteboard) {
            return undefined;
          }
          return whiteboard;
        })
        .catch((err: any) => {
          throw err;
        });
    },
    findByAuthor: async (userID) => {
      return await whiteboardSchema
        .find({ author: userID })
        .then((whiteboards: IWhiteboardModel[]) => {
          if (!whiteboards) {
            return [];
          }
          return whiteboards;
        })
        .catch((err: any) => {
          throw err;
        });
    },
    findByAudience: async (userID) => {
      return await whiteboardSchema
        .find({ audience: userID })
        .then((whiteboards: IWhiteboardModel[]) => {
          if (!whiteboards) {
            return [];
          }
          return whiteboards;
        })
        .catch((err: any) => {
          throw err;
        });
    },
  });

export default makeWhiteboardDb;
