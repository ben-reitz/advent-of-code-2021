import { parseInputFile } from '../../lib/utils.js';

const input = parseInputFile('./solutions/day-4/input.txt');
const sections = input.split('\n\n');

// array of called numbers as a number
const calledNumbers = sections[0].split(',').map(Number);

/**
 * Format all boards in the following format:
 *  [
 *     [ 12, '14'], ...
 *  ]
 *  Each board is an array of rows
 *  Each row is an array of bingo numbers
 *  Each bingo number is either a number or a string depending on if it's been called. called => string
 *    e.g. 12 is uncalled, '14' is called
 */
let allBoards = sections.slice(1).map((board) => {
    const boardArr = board.split('\n');
    return boardArr.map((row) => {
        const rowArray = row.trim().split(/\s+/g);
        return rowArray.map(Number);
    });
});

const rowLength = allBoards[0][0].length;

let finalCalledNumber = null;
let finalWinningBoard = null;

// call the numbers and check for wins after each number. Gradually filter out winning boards from the array
for (const calledNumber of calledNumbers) {
    console.log(`---------------CALLING ${calledNumber}------------------`);

    // First: mark off all instances of the calledNumber
    for (const board of allBoards) {
        board.forEach((row, index) => {
            board[index] = row.map((number) => (number === calledNumber ? number.toString() : number));
        });
    }

    /**
     * Second: check for either
     * 1. completed row (all vals in a row array are strings)
     * 2. completed column (same index in all row arrays are strings)
     */

    // Remove boards which are completed
    allBoards = allBoards.filter((board) => {
        for (const row of board) {
            // completed row (all vals in a row array are strings)
            if (row.every((value) => typeof value === 'string')) {
                console.log(`this board wins:`);
                console.log(board);
                finalWinningBoard = board;
                finalCalledNumber = calledNumber;
                return false;
            }
        }

        for (let i = 0; i < rowLength; i++) {
            // completed column (same index in all row arrays are strings)
            if (board.every((row) => typeof row[i] === 'string')) {
                console.log(`this board wins:`);
                console.log(board);
                finalWinningBoard = board;
                finalCalledNumber = calledNumber;
                return false;
            }
        }
        return true;
    });

    if (allBoards.length === 0) {
        console.log(`All boards have won - stop calling numbers`);
        break;
    }
}

/**
 * calculate final values
 * 1. flatten rows into 1 array of numbers
 * 2. filter out marked numbers (strings)
 * 3. add all remaining values together (reducer)
 * @type {number}
 */
const sumOfUnmarkedNumbers = finalWinningBoard
    .flat()
    .filter((value) => typeof value === 'number')
    .reduce((accumulator, val) => accumulator + val, 0);

console.log(`Sum of unmarked numbers:`);
console.log(sumOfUnmarkedNumbers);
console.log(`Last number called:`);
console.log(finalCalledNumber);

console.log(`Final score:`);
console.log(sumOfUnmarkedNumbers * finalCalledNumber);
