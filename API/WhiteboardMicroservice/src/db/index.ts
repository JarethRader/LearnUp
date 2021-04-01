import { Sequelize, DataTypes } from "sequelize";

import buildWhiteboardSchema from "./schemas/Whiteboard";
import buildLayoutSchema from "./schemas/Layout";
import buildTileSchema from "./schemas/Tile";
import buildCollectionTileSchema from "./schemas/CollectionTile";

const buildSchemas = (sequelize: Sequelize) => {
  const WhiteboardSchema = buildWhiteboardSchema(sequelize, DataTypes);
  const LayoutSchema = buildLayoutSchema(sequelize, DataTypes);
  const TileSchema = buildTileSchema(sequelize, DataTypes);
  const CollectionTileSchema = buildCollectionTileSchema(sequelize, DataTypes);

  // define relationships between schemas
  // 1:1 whiteboard:layout
  // @ts-ignore
  WhiteboardSchema.hasOne(LayoutSchema, { foreignKey: "l_id" });
  // @ts-ignore
  LayoutSchema.belongsTo(WhiteboardSchema, { foreignKey: "l_id" });
  // 1:1 CollectionTile:Tile
  // @ts-ignore
  CollectionTileSchema.hasOne(TileSchema, { foreignKey: "t_id" });
  // @ts-ignore
  TileSchema.belongsTo(CollectionTileSchema, { foreignKey: "t_id" });
  // N:M CollectionTile:Layout
  // @ts-ignore
  CollectionTileSchema.belongsToMany(LayoutSchema, {
    through: "Collection_Layout",
  });
  // @ts-ignore
  LayoutSchema.belongsToMany(CollectionTileSchema, {
    through: "Collection_Layout",
  });
  // N:M CollectionTile:Whiteboard
  // @ts-ignore
  CollectionTileSchema.belongsToMany(WhiteboardSchema, {
    through: "Collection_Whiteboard",
  });
  // @ts-ignore
  WhiteboardSchema.belongsToMany(CollectionTileSchema, {
    through: "Collection_Whiteboard",
  });

  const Schemas = Object.freeze({
    WhiteboardSchema,
    LayoutSchema,
    TileSchema,
    CollectionTileSchema,
  });

  return Schemas;
};

export default buildSchemas;
