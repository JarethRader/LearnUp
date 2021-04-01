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
    _id = Id.makeId(),
    boardName,
    author, // the userID of the user who created the board
    audience, // (optional) a userID for a user who was a part of the lesson
    layout, //UID of layout in DB
    learningSet, //UID of learningSet in DB
    createdOn = Date.now(),
    modifiedOn = Date.now(),
  }) => {
    if (!Id.isValidId(_id)) throw new Error("Must have a valid ID");
    if (!author || !Id.isValidId(author))
      throw new Error("Must have a valid author");
    if (audience !== "none") {
      if (audience && !Id.isValidId(audience))
        throw new Error("Must have a valid audience ID");
    }
    if (!layout) throw new Error("Must have an associated layout");
    if (!learningSet) throw new Error("Must have an associated learning set");
    if (boardName && !Name.isValidName(boardName))
      throw new Error("Board name can only contain alphanumeric characters");

    return Object.freeze({
      getId: () => _id,
      getName: () => boardName || "MyBoard",
      getAuthor: () => author,
      getAudience: () => audience || "none",
      getBoardState: () => learningSet,
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn,
      toObject: () => {
        return {
          _id,
          boardName,
          author,
          audience,
          learningSet,
          createdOn,
          modifiedOn,
        };
      },
    });
  };

  return makeWhiteboard;
};

export default buildMakeWhiteboard;
