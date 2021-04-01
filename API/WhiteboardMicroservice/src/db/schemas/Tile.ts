const buildTileSchema: TBuildSchema = (sequelize, DataTypes) => {
  const Tiles = <TilesStatic>sequelize.define(
    "Tile",
    {
      // attributes
      t_id: {
        // tileID
        type: DataTypes.STRING(128),
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      l: {
        // letters
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      c: {
        // color
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      // options
      timestamps: false,
    }
  );

  return Tiles;
};

export default buildTileSchema;
