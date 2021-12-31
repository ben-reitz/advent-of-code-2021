import { readFileSync } from 'fs';

const measurements = readFileSync("./solutions/day-1/input.txt").toString().split('\n').map(Number);

let numIncreases = 0

// i starts at 1 because first measurement can't be compared to previous
for (let i = 1; i < measurements.length; i++) {
    if (measurements[i] > measurements[i - 1]) {
        numIncreases++
    }
}

console.log("number of increases: ", numIncreases)
