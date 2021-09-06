const Sequelize = require("sequelize");
const db = require("../db");

const Board = db.define("board", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  num_players: {
    type: Sequelize.ENUM({
        values: ["2","4"]
    }),
    allowNull: false,
  },
});
  
module.exports = Board;