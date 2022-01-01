import { parseInputFile } from '../../lib/utils.js';

const input = parseInputFile('./solutions/day-4/input.txt');
const sections = input.split('\n\n');

// array of called numbers as a number
const calledNumbers = sections[0].split(',').map(Number);

const allBoards = sections.slice(1);

/**
 * Format all boards in the following format:
 *  [
 *     [ 12, '14'], ...
 *  ]
 *  Each board is an array of rows
 *  Each row is an array of bingo numbers
 *  Each bingo number is either a number or a string depending on if it's been called. called => string
 *    e.g. 12 is uncalled, '14' is called
 * @type {number[][][]}
 */
const boardsFormatted = allBoards.map((board) => {
    const boardArr = board.split('\n');
    return boardArr.map((row) => {
        const rowArray = row.trim().split(/\s+/g);
        return rowArray.map(Number);
    });
});

const rowLength = boardsFormatted[0][0].length;

let theWinner = null;
let finalCalledNumber = null;

// call the numbers and check for wins after each number. If someone wins, stop calling numbers
for (const calledNumber of calledNumbers) {
    // First: mark off all instances of the calledNumber
    for (const board of boardsFormatted) {
        board.forEach((row, index) => {
            board[index] = row.map((number) => (number === calledNumber ? number.toString() : number));
        });
    }

    /**
     * Second: check for either
     * 1. completed row (all vals in a row array are strings)
     * 2. completed column (same index in all row arrays are strings)
     */
    for (let i = 0; i < boardsFormatted.length; i++) {
        const currentBoard = boardsFormatted[i];
        for (const row of currentBoard) {
            if (row.every((value) => typeof value === 'string')) {
                console.log(`row completed on board ${i + 1}:`);
                theWinner = boardsFormatted[i];
                finalCalledNumber = calledNumber;
                break;
            }
        }

        for (let i = 0; i < rowLength; i++) {
            if (currentBoard.every((row) => typeof row[i] === 'string')) {
                console.log(`column completed on board ${i + 1}:`);
                theWinner = boardsFormatted[i];
                finalCalledNumber = calledNumber;
                break;
            }
        }
    }
    if (theWinner) break;
}

/**
 * calculate final values
 * 1. flatten rows into 1 array
 * 2. filter out marked numbers (strings)
 * 3. add all remaining values together (reducer)
 * @type {number}
 */
const sumOfUnmarkedNumbers = theWinner
    .flat()
    .filter((value) => typeof value === 'number')
    .reduce((accumulator, val) => accumulator + val, 0);

console.log(theWinner);

console.log(`Sum of unmarked numbers:`);
console.log(sumOfUnmarkedNumbers);
console.log(`Last number called:`);
console.log(finalCalledNumber);

console.log(`Final score:`);
console.log(sumOfUnmarkedNumbers * finalCalledNumber);
