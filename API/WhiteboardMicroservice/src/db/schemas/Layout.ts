const buildLayoutSchema: TBuildSchema = (sequelize, DataTypes) => {
  const Layout = <LayoutStatic>sequelize.define(
    "Layout",
    {
      // attributes
      // layoutID
      l_id: {
        type: DataTypes.STRING(128),
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      // boundingX
      bx: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // boundingY
      by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // boundingWidth
      bw: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // boundingHeight
      bh: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // whiteboardID
      w_id: {
        type: DataTypes.STRING(128),
        unique: true,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      // options
    }
  );

  return Layout;
};

export default buildLayoutSchema;
