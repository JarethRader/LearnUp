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
    name,
    author, // the userID of the user who created the board
    audience, // (optional) a userID for a user who was a part of the lesson
    boardState = [],
    createdOn = Date.now(),
    modifiedOn = Date.now(),
  }) => {
    if (!Id.isValidId(_id)) throw new Error('Must have a valid ID');
    if (!author || !Id.isValidId(author))
      throw new Error('Must have a valid author');
    if (audience !== undefined && !Id.isValidId(audience))
      throw new Error('Must have a valid audience ID');
    if (!boardState) throw new Error('Must have a valid board state');
    if (name && !Name.isValidName(name))
      throw new Error('Board name can only contain alphanumeric characters');

    return Object.freeze({
      getId: () => _id,
      getName: () => name || 'MyBoard',
      getAuthor: () => author,
      getAudience: () => audience || 'none',
      getBoardState: () => boardState,
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn,

      toObject: () => {
        return {
          _id,
          name,
          author,
          audience,
          boardState,
          createdOn,
          modifiedOn,
        };
      },
    });
  };

  return makeWhiteboard;
};

export default buildMakeWhiteboard;
