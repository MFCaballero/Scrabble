const fs = require('fs');

const allowedWords = {};
const data = fs.readFileSync('./sowpods.txt');
const words = data.toString().replace(/\r\n/g,'\n').split('\n');
words.forEach(word => allowedWords[word] = true);
module.exports = allowedWords

