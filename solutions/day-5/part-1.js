import { parseInputFile, print2dArrayAsGrid } from '../../lib/utils.js';

const input = parseInputFile('./solutions/day-5/input.txt');

/**
 * formats data like this:
 * [
 *   { start: [ 0, 9 ], end: [ 5, 9 ] },
 *   ...
 * ]
 * @type {string[][][]}
 */
const lines = input
    .split('\n')
    .map(line => line.split(' -> ').map(coord => coord.split(',').map(Number)))
    .map(([start, end]) => ({ start, end }));

console.log(lines);

const maxXReducer = (previousMax, current) =>
    Math.max(previousMax, current.start[0], current.end[0]);
const maxYReducer = (previousMax, current) =>
    Math.max(previousMax, current.start[1], current.end[1]);

const xMax = lines.reduce(maxXReducer, 0);
const yMax = lines.reduce(maxYReducer, 0);

console.log(`x max: ${xMax}`);
console.log(`y max: ${yMax}`);

// initialise xMax x yMax grid as 2d array (initial value for each coord is 0)
const grid = [...Array(yMax + 1)].map(row => Array(xMax + 1).fill(0));

for (const { start: lineStart, end: lineEnd } of lines) {
    // check if line is vertical (x co-ords are the same)
    if (lineStart[0] === lineEnd[0]) {
        const x = lineStart[0];
        const startY = Math.min(lineStart[1], lineEnd[1]);
        const endY = Math.max(lineStart[1], lineEnd[1]);

        for (let y = startY; y <= endY; y++) {
            grid[x][y] = grid[x][y] + 1;
        }

        console.log(`from ${lineStart} -> ${lineEnd}`);

        // use the following to print out the smaller grid if you're testing out the code (don't use with the full input)
        //print2dArrayAsGrid(grid);

        continue;
    }

    // check if line is horizontal (y co-ords are the same)
    if (lineStart[1] === lineEnd[1]) {
        const y = lineStart[1];
        const startX = Math.min(lineStart[0], lineEnd[0]);
        const endX = Math.max(lineStart[0], lineEnd[0]);

        for (let x = startX; x <= endX; x++) {
            grid[x][y] = grid[x][y] + 1;
        }

        console.log(`from ${lineStart} -> ${lineEnd}`);

        // use the following to print out the smaller grid if you're testing out the code (don't use with the full input)
        //print2dArrayAsGrid(grid);
    }
}

// now that we've drawn out the grid, let's count the points which are > 1
console.log('Number of dangerous points:');
console.log(grid.flat().filter(point => point > 1).length);
