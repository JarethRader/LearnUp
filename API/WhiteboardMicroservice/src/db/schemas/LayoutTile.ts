const buildLayoutTileSchema: TBuildSchema = (sequelize, DataTypes) => {
  const LayoutTiles = <CollectionTileStatic>sequelize.define(
    "Layout_Tile",
    {
      // attributes
      // collectionID
      c_id: {
        type: DataTypes.STRING(128),
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      // parentID
      p_id: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      // tileID
      t_id: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      // deltaX
      dx: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // deltaY
      dy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      // options
    }
  );

  return LayoutTiles;
};

export default buildLayoutTileSchema;
