import { Sequelize } from "sequelize";
import envConfig from "../env";
import buildSchemas from "../db";
import buildMakeWhiteboardDB from "./pg-whiteboard-bd";

const buildMakeDB = () => {
  const sequelize = new Sequelize(envConfig["POSTGRES_URI"]);
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connection has been established succesfully");
    })
    .catch((err) => console.log("Unable to connect to the database: ", err));

  const DBSchemas = buildSchemas(sequelize);

  // TODO: I should check it the databases already exist, and it they don't I'll need to populate the Tiles DB atleast, but I could do other setup here

  const whiteboardDB = buildMakeWhiteboardDB(DBSchemas);

  return whiteboardDB;
};

export default buildMakeDB;
