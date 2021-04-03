const buildMakeWhiteboard = (
  Id: {
    makeId: () => string;
    isValidId: (id: string) => boolean;
  },
  Name: {
    isValidName: (name: string) => boolean;
  }
) => {
  const makeWhiteboard: MakeWhiteboard = ({
    whiteboard_id = Id.makeId(),
    boardName,
    author, // the userID of the user who created the board
    audience, // (optional) a userID for a user who was a part of the lesson
    layout,
    createdOn = Date.now(),
    modifiedOn = Date.now(),
  }) => {
    if (!Id.isValidId(whiteboard_id))
      throw new Error("Must have a valid whiteboard ID");
    if (!layout.layout_id) layout.layout_id = Id.makeId();
    if (!Id.isValidId(layout.layout_id))
      throw new Error("Must have a valid layout ID");
    if (!boardName) boardName = "My Board";
    if (boardName && !Name.isValidName(boardName))
      throw new Error("Must have a valid name");
    if (!author || !Id.isValidId(author))
      throw new Error("Must have a valid author UUID");
    if (!audience) audience = "none";
    if (audience && !Id.isValidId(author))
      throw new Error("Must have a valid audience UUID");

    if (
      !layout.boundingRect.x ||
      !layout.boundingRect.y ||
      !layout.boundingRect.width ||
      !layout.boundingRect.height
    )
      throw new Error("Must have valid layout bounding rect");

    return Object.freeze({
      getId: () => whiteboard_id,
      getName: () => boardName || "My board",
      getAuthor: () => author,
      getAudience: () => audience || "none",
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn,
      toObject: () => {
        return {
          whiteboard_id,
          boardName,
          author,
          audience,
          layout,
          createdOn,
          modifiedOn,
        };
      },
    });
  };

  return makeWhiteboard;
};

export default buildMakeWhiteboard;
