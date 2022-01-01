import { parseInputFile } from '../../lib/utils.js';

const input = parseInputFile('./solutions/day-2/input.txt');

let horizontal = 0;
let depth = 0;

/**
 * get instructions in the form:
 * [ ['forward', 8], ['up', 2] ... ]
 * @type {[string,number][]}
 */
const instructions = input
    .split('\n')
    .map((command) => command.split([' ']))
    .map(([dir, value]) => [dir, Number(value)]);

for (let command of instructions) {
    const [direction, value] = command;
    switch (direction) {
        case 'forward':
            horizontal += value;
            break;
        case 'up':
            depth -= value;
            break;
        case 'down':
            depth += value;
            break;
        default:
            throw new Error(`invalid command ${direction}`);
    }
}

console.log('horizontal: ', horizontal);
console.log('depth:      ', depth);
console.log('multiplied: ', depth * horizontal);
