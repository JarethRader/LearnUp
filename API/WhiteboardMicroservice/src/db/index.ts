import { Sequelize, DataTypes } from "sequelize";

import buildWhiteboardSchema from "./schemas/Whiteboard";
import buildLayoutSchema from "./schemas/Layout";
import buildTileSchema from "./schemas/Tile";
import buildLayoutTileSchema from "./schemas/LayoutTile";
import buildWhiteboardTileSchema from "./schemas/WhiteboardTile";

const buildSchemas = (sequelize: Sequelize) => {
  const WhiteboardSchema = buildWhiteboardSchema(sequelize, DataTypes);
  const LayoutSchema = buildLayoutSchema(sequelize, DataTypes);
  const TileSchema = buildTileSchema(sequelize, DataTypes);
  const LayoutTileSchema = buildLayoutTileSchema(sequelize, DataTypes);
  const WhiteboardTileSchema = buildWhiteboardTileSchema(sequelize, DataTypes);

  // define relationships between schemas
  // whiteboard:layout
  // @ts-ignore
  WhiteboardSchema.hasOne(LayoutSchema, { foreignKey: "w_id" });
  // @ts-ignore
  LayoutSchema.belongsTo(WhiteboardSchema, { foreignKey: "w_id" });

  // Layout:CollectionTile
  // @ts-ignore
  LayoutSchema.hasMany(LayoutTileSchema, { foreignKey: "p_id" });
  // @ts-ignore
  LayoutTileSchema.belongsTo(LayoutSchema, { foreignKey: "p_id" });

  // Whiteboard:CollectionTile
  // @ts-ignore
  WhiteboardSchema.hasMany(WhiteboardTileSchema, { foreignKey: "p_id" });
  // @ts-ignore
  WhiteboardTileSchema.belongsTo(WhiteboardSchema, { foreignKey: "p_id" });

  // CollectionTile:Tile
  // @ts-ignore
  TileSchema.hasOne(LayoutTileSchema, { foreignKey: "t_id" });
  // @ts-ignore
  LayoutTileSchema.belongsTo(TileSchema, { foreignKey: "t_id" });

  // CollectionTile:Tile
  // @ts-ignore
  TileSchema.hasOne(WhiteboardTileSchema, { foreignKey: "t_id" });
  // @ts-ignore
  WhiteboardTileSchema.belongsTo(TileSchema, { foreignKey: "t_id" });

  const Schemas = Object.freeze({
    WhiteboardSchema,
    LayoutSchema,
    TileSchema,
    LayoutTileSchema,
    WhiteboardTileSchema,
  });

  return Schemas;
};

export default buildSchemas;
