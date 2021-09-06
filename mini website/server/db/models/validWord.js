const Sequelize = require("sequelize");
const db = require("../db");

const validWord = db.define("valid_word", {
  word: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = validWord;
