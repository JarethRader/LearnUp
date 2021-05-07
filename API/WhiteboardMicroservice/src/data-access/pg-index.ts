import { Sequelize } from "sequelize";
import envConfig from "../env";
import buildSchemas from "../db";
import buildMakeWhiteboardDB from "./pg-whiteboard-bd";

import Id from "../Id";

const operationHelper = (
  list1: ITileList[],
  list2: ITileList[],
  isUnion = false
) =>
  list1.filter(
    // @ts-ignore
    ((set) => (a) => isUnion === set.has(a.uid))(
      new Set(list2.map((b) => b.uid))
    )
  );

const Operations = Object.freeze({
  inBoth: (tileList1: ITileList[], tileList2: ITileList[]) =>
    operationHelper(tileList1, tileList2, true),
  inFirstOnly: (tileList1: ITileList[], tileList2: ITileList[]) =>
    operationHelper(tileList1, tileList2),
  inSecondOnly: (tileList1: ITileList[], tileList2: ITileList[]) =>
    operationHelper(tileList2, tileList1),
});

const buildMakeDB = () => {
  const sequelize = new Sequelize(envConfig["POSTGRES_URI"], {
    dialect: "postgres",
    logging: false,
  });
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connection has been established successfully");
    })
    .catch((err) => console.error("Unable to connect to the database: ", err));

  const DBSchemas = buildSchemas(sequelize);

  // TODO: I should check it the databases already exist, and it they don't I'll need to populate the Tiles DB atleast, but I could do other setup here

  const whiteboardDB = buildMakeWhiteboardDB(DBSchemas, Id, Operations);

  return whiteboardDB;
};

export default buildMakeDB;
