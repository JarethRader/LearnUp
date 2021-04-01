const buildWhiteboardSchema: TBuildSchema = (sequelize, DataTypes) => {
  const Whiteboard = <WhiteboardStatic>sequelize.define(
    "Whiteboard",
    {
      // whiteboardID
      w_id: {
        type: DataTypes.STRING(128),
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      // board name
      bn: {
        type: DataTypes.STRING(128),
        allowNull: false,
        defaultValue: "My_Board",
      },
      // author
      ar: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      // audience
      au: {
        type: DataTypes.STRING(128),
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

  return Whiteboard;
};

export default buildWhiteboardSchema;
