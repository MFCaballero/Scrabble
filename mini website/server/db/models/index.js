const Board = require("./board");
const Box = require("./box");
const letterValue = require("./letterValue");
const Player = require("./player");
const validWord = require("./validWord");

// associations

Board.hasMany(Player);
Player.belongsTo(Board);

Board.hasMany(Box);
Box.belongsTo(Board);

validWord.belongsToMany(Board, { through: 'board_validWord' });
Board.belongsToMany(validWord, { through: 'board_validWord' });

letterValue.belongsToMany(Board, { through: 'board_letterValue' });
Board.belongsToMany(letterValue, { through: 'board_letterValue' });

module.exports = {
  Board,
  Box,
  letterValue,
  Player,
  validWord
};
