import { Sequelize, DataTypes } from "sequelize";

import buildWhiteboardSchema from "./schemas/Whiteboard";
import buildLayoutSchema from "./schemas/Layout";
import buildTileSchema from "./schemas/Tile";
import buildCollectionTileSchema from "./schemas/CollectionTile";
import whiteboardController from "../controllers";

const buildSchemas = (sequelize: Sequelize) => {
  const WhiteboardSchema = buildWhiteboardSchema(sequelize, DataTypes);
  const LayoutSchema = buildLayoutSchema(sequelize, DataTypes);
  const TileSchema = buildTileSchema(sequelize, DataTypes);
  const CollectionTileSchema = buildCollectionTileSchema(sequelize, DataTypes);

  // define relationships between schemas
  // whiteboard:layout
  // @ts-ignore
  WhiteboardSchema.hasOne(LayoutSchema, { foreignKey: "w_id" });
  // @ts-ignore
  LayoutSchema.belongsTo(WhiteboardSchema, { foreignKey: "w_id" });

  // Layout:CollectionTile
  // @ts-ignore
  LayoutSchema.hasMany(CollectionTileSchema, { foreignKey: "p_id" });
  // @ts-ignore
  CollectionTileSchema.belongsTo(LayoutSchema, { foreignKey: "p_id" });

  // Whiteboard:CollectionTile
  // @ts-ignore
  WhiteboardSchema.hasMany(CollectionTileSchema, { foreignKey: "p_id" });
  // @ts-ignore
  CollectionTileSchema.belongsTo(WhiteboardSchema, { foreignKey: "p_id" });

  // CollectionTile:Tile
  // @ts-ignore
  TileSchema.hasOne(CollectionTileSchema, { foreignKey: "t_id" });
  // @ts-ignore
  CollectionTileSchema.belongsTo(TileSchema, { foreignKey: "t_id" });

  const Schemas = Object.freeze({
    CollectionTileSchema,
    WhiteboardSchema,
    LayoutSchema,
    TileSchema,
  });

  return Schemas;
};

export default buildSchemas;
