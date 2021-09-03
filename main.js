const Jsonboard = require('./scrabble_board.json');
const JsonletterValues = require('./letter_values.json');
const boardString = JSON.stringify(Jsonboard);
const letterValuesString = JSON.stringify(JsonletterValues);

const board = JSON.parse(boardString);
const letterValues = JSON.parse(letterValuesString);
const allowedWords = require('./sowPods');

//Helper Functions
function boardTraverse(array){
    const letterPositions = {};
    //horizontal traverse
    for(let i = 0; i < array.length; i++){
        let word = [];
        let position = [];
        for(let j =0; j < array[0].length; j++){        
            if(array[i][j] !== "-" && !(array[i][j+1] === "-" && array[i][j-1] === "-")){
                word.push(array[i][j]);
                position.push([i,j]);
            }
        }
        if(word.length > 0){
            letterPositions[word.join("")] = position
        }
    }
    //vertical traverse
    for(let i = 0; i<array[0].length; i++){
        let word = [];
        let position = [];
        for(let j = 0; j < array.length; j++){
            if(array[j][i] !== "-" && !(array[j+1][i] === "-" && array[j-1][i] === "-")){
                word.push(array[j][i]);
                position.push([j,i]);
            }
        }
        if(word.length > 0){
            letterPositions[word.join("")] = position
        }
    }
    return letterPositions;
}

function findNewWords(array1,array2){
    const previous = boardTraverse(array1);
    const newWord = boardTraverse(array2);
    for(key in newWord){
        if (key in previous){
            delete newWord[key];
        }
    }
    return newWord;
}

function checkTiles(your_tiles, your_board, board_after_word_added){
    const clean_your_board = your_board.flat().filter(element => element !== "-").concat(your_tiles.split(""));
    const clean_board_after_word_added = board_after_word_added.flat().filter(element => element !== "-");
    const lettersExpected = {};
    clean_your_board.forEach(letter => {
        if(!lettersExpected[letter]) lettersExpected[letter] = 0
        else lettersExpected[letter] += 1
    });
    const lettersGot = {};
    clean_board_after_word_added.forEach(letter => lettersGot[letter] = true);
    if(clean_your_board.length !== clean_board_after_word_added.length) return false
    for(key in lettersGot){
        if(!(key in lettersExpected)) return false
        if(lettersGot[key] !== lettersExpected[key]) return false
    }
    return true
}

//Main Function
//Considering the case where the word form with your_tiles is invalid and a secodary word is form that is valid and allowed

function Scrabble(your_tiles, your_board, board_after_word_added){
    const newWords = findNewWords(your_board, board_after_word_added);
    let score = 0;
    if(!checkTiles(your_tiles, your_board, board_after_word_added)) return -1;
    for(key in newWords){
        let doubleWord = 0;
        let tripleWord = 0;
        let wordValue = 0;
        if(key in allowedWords){
            newWords[key].forEach(position => {
                const letter = board_after_word_added[position[0]][position[1]];
                let letterValue = letterValues[letter];
                if(board[position[0]][position[1]] === "DL") letterValue *= 2;
                else if (board[position[0]][position[1]] === "TL") letterValue *= 3;
                else if (board[position[0]][position[1]] === "DW" || board[position[0]][position[1]] === "**") doubleWord ++;
                else if (board[position[0]][position[1]] === "TW") tripleWord ++;
                wordValue += letterValue;
            })
            if(doubleWord > 0 ) wordValue = wordValue * 2 * doubleWord;
            if (tripleWord > 0) wordValue = wordValue * 3 * tripleWord;
            score += wordValue;
        }
        
    }
    if(score > 0 ) return score;
    else return -1;
}

//Considering the case that the word formed with your_tiles is invalid and there is a secondary word formed that is valid but doesn't count

function isValid(your_tiles, newWords){
    for(key in newWords){
        let lettersCount = 0;
        var valid = true;
        if(key.length >= your_tiles.length){
            key.split("").forEach(letter => {
                if(your_tiles.includes(letter)) lettersCount += 1;
                if(lettersCount === your_tiles.length && !(key in allowedWords)) valid = !valid
            })
        }
    }
    return valid;
}

function Scrabble(your_tiles, your_board, board_after_word_added){
    if(!checkTiles(your_tiles, your_board, board_after_word_added)) return -1;
    const newWords = findNewWords(your_board, board_after_word_added);
    if(!isValid(your_tiles,newWords)) return -1;
    let score = 0;
    for(key in newWords){
        let doubleWord = 0;
        let tripleWord = 0;
        let wordValue = 0;
        if(key in allowedWords){
            newWords[key].forEach(position => {
                const letter = board_after_word_added[position[0]][position[1]];
                let letterValue = letterValues[letter];
                if(board[position[0]][position[1]] === "DL") letterValue *= 2;
                else if (board[position[0]][position[1]] === "TL") letterValue *= 3;
                else if (board[position[0]][position[1]] === "DW" || board[position[0]][position[1]] === "**") doubleWord ++;
                else if (board[position[0]][position[1]] === "TW") tripleWord ++;
                wordValue += letterValue;
            })
            if(doubleWord > 0 ) wordValue = wordValue * 2 * doubleWord;
            if (tripleWord > 0) wordValue = wordValue * 3 * tripleWord;
            score += wordValue;
        }
        
    }
    if(score > 0 ) return score;
    else return -1;
}

