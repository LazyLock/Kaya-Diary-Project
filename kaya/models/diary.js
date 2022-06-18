const Sequelize = require("sequelize");

module.exports = class Diary extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        category: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        friends: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        title: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Diary",
        tableName: "diarys",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {}
};
