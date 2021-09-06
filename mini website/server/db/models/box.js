const Sequelize = require("sequelize");
const db = require("../db");

const Box = db.define("box", {
  position: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  points: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  letter: {
    type: Sequelize.STRING,
    defaultValue: "-",
  }
});

module.exports = Box;
