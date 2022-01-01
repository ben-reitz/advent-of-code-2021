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

const maxXReducer = (previousMax, current) =>
    Math.max(previousMax, current.start[0], current.end[0]);
const maxYReducer = (previousMax, current) =>
    Math.max(previousMax, current.start[1], current.end[1]);

const xMax = lines.reduce(maxXReducer, 0);
const yMax = lines.reduce(maxYReducer, 0);

console.log(`x max: ${xMax}`);
console.log(`y max: ${yMax}`);

const calculateDirection = (start, end) => {
    if (start[0] === end[0]) {
        return start[1] < end[1] ? 'vertical-up' : 'vertical-down';
    } else if (start[1] === end[1]) {
        return 'horizontal';
    } else {
        return start[1] < end[1] ? 'slope-up' : 'slope-down';
    }
};

const calculateLength = (start, end, direction) => {
    switch (direction) {
        case 'vertical-up':
        case 'vertical-down':
            return Math.sqrt((end[1] - start[1]) ** 2);
        default:
            return Math.sqrt((end[0] - start[0]) ** 2);
    }
};

// initialise xMax x yMax grid as 2d array (initial value for each coord is 0)
const grid = [...Array(yMax + 1)].map(row => Array(xMax + 1).fill(0));

for (const { start: lineStart, end: lineEnd } of lines) {
    // sort coords with lowest x coord first
    // (so line is always going vertically or left to right)
    const sortedCoords = [lineStart, lineEnd].sort((first, second) =>
        first[0] <= second[0] ? -1 : 1
    );

    const first = sortedCoords[0];
    const second = sortedCoords[1];
    const lineDirection = calculateDirection(first, second);
    const lineLength = calculateLength(first, second, lineDirection);

    for (let i = 0; i <= lineLength; i++) {
        let x;
        let y;
        switch (lineDirection) {
            case 'vertical-up':
                x = first[0];
                y = first[1] + i;
                break;
            case 'slope-up':
                x = first[0] + i;
                y = first[1] + i;
                break;
            case 'horizontal':
                x = first[0] + i;
                y = first[1];
                break;
            case 'slope-down':
                x = first[0] + i;
                y = first[1] - i;
                break;
            case 'vertical-down':
                x = first[0];
                y = first[1] - i;
                break;
            default:
                throw new Error('invalid line direction');
        }
        grid[x][y] = grid[x][y] + 1;
    }

    // use the following to print out the smaller grid if you're testing out the code (don't use with the full input)
    // print2dArrayAsGrid(grid);
}

// now that we've drawn out the grid, let's count the points which are > 1
console.log('Number of dangerous points:');
console.log(grid.flat().filter(point => point > 1).length);
