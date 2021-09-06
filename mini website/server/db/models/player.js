const Sequelize = require("sequelize");
const db = require("../db");
const crypto = require("crypto");

const Player = db.define("player", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  tiles: {
    type: Sequelize.STRING,
    allowNull: false
  },
});


module.exports = Player;
