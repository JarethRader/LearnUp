import Id from "../Id";

const buildMakeLayout = (Id: {
  makeId: () => string;
  isValidId: (id: string) => boolean;
}) => {
  const makeLayout: MakeLayout = ({
    _id = Id.makeId(),
    layoutRect,
    layout,
    createdOn = Date.now(),
    modifiedOn = Date.now(),
  }) => {
    if (!Id.isValidId(_id)) throw new Error("Must have a valid ID");
    if (!layoutRect) throw new Error("Must contain layout bounding rect");
    if (!layout) throw new Error("Must contain layout tiles");
    return Object.freeze({
      getId: () => _id,
      getLayoutRect: () => layoutRect,
      getLayout: () => layout,
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn,
      toObject: () => {
        return {
          _id,
          layoutRect,
          layout,
          createdOn,
          modifiedOn,
        };
      },
    });
  };
  return makeLayout;
};

export default buildMakeLayout;
