/**
 * @Desc I want to perform some initial one-time setup when the server starts
 *      I want to make sure the tables are all empty, if a table exists I'll drop it, and I want to populate the tiles db with all the tiles.
 *      I can't do this in the schema definition because that will be run everytime I make a request and make a change to the database
 */
import { Sequelize } from "sequelize";
import envConfig from "../../env";
import buildSchemas from "../../db";
const tileSet = require("./tileSet.json");

type TTile = {
  tileID: string;
  letters: string;
  color: string;
};

const setupDB = () => {
  const sequelize = new Sequelize(envConfig["POSTGRES_URI"], {
    dialect: "postgres",
    logging: false,
  });
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connection has been established successfully");
      const DBSchemas = buildSchemas(sequelize);

      DBSchemas.WhiteboardSchema.sync({ force: true });
      DBSchemas.LayoutSchema.sync({ force: true });
      DBSchemas.CollectionTileSchema.sync({ force: true });
      DBSchemas.TileSchema.sync({ force: true }).then((success) => {
        tileSet.tiles.forEach((tile: TTile) => {
          // @ts-ignore
          DBSchemas.TileSchema.create({
            t_id: tile.tileID,
            l: tile.letters,
            c: tile.color,
          }).catch((err) => {
            console.log("Error while creating new tile: ", err);
          });
        });
      });
      console.log("Tiles Database populated with all possible tiles");
    })
    .catch((err) => console.log("Unable to connect to the database: ", err));
};

export default setupDB;
