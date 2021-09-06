const Sequelize = require("sequelize");
const db = require("../db");

const letterValue = db.define("letter_value", {
  letter: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  value: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = letterValue;
