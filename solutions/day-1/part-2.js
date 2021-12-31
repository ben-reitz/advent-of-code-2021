import { readFileSync } from 'fs';

const measurements = readFileSync("./solutions/day-1/input.txt").toString().split('\n').map(Number);

const addReducer = (accumulator, val) => accumulator + val;

let numIncreases = 0

/**
 * again - i starts at 1 because we can't compare the first window to the previous
 * we end at `measurements.length - 2` because we need a full window for the last value
 */
for (let i = 1; i < (measurements.length - 2); i++) {
    const currentWindowSum = measurements.slice(i, i + 3).reduce(addReducer, 0);
    const prevWindowSum = measurements.slice(i - 1, i + 2).reduce(addReducer, 0);
    if (currentWindowSum > prevWindowSum) {
        numIncreases++
    }
}


console.log("number of increases: ", numIncreases)
