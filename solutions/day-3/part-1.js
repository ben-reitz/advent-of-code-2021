import { parseInputFile } from '../../lib/utils.js';

const input = parseInputFile('./solutions/day-3/input.txt')

const diagnostics = input.split('\n');

const calculateGamma = (readings) => {
    const diagnosticLength = readings[0].length;
    let bitWeights = new Array(diagnosticLength);
    bitWeights.fill(0);

    for (let diagnosticIndex = 0; diagnosticIndex < diagnostics.length; diagnosticIndex++) {
        for (let charIndex = 0; charIndex < diagnosticLength; charIndex++) {
            if (diagnostics[diagnosticIndex].charAt(charIndex) === '0') {
                bitWeights[charIndex]--;
            } else {
                bitWeights[charIndex]++;
            }
        }
    }

    let gammaReading = '';

    bitWeights.forEach((weighting, bitIndex) => {
        switch(Math.sign(weighting)) {
            case -1:
                gammaReading = gammaReading.concat('0');
                break;
            case 1:
                gammaReading = gammaReading.concat('1');
                break;
            case 0:
                throw new Error(`Equal numbers of 1s and 0s in index ${bitIndex}`)
            default:
                throw new Error(`Invalid case: ${weighting}`)
        }
    })

    return gammaReading;
}

const gamma = calculateGamma(diagnostics);

/**
 * The sigma value is just the inverse of every bit so the XOR operator should cover us off here (^)
 */
const sigma = gamma.replace(/[10]/g, bit => bit ^ 1);

console.log(`gamma (decimal): ${gamma} (${parseInt(gamma, 2)})`)
console.log(`sigma (decimal): ${sigma} (${parseInt(sigma, 2)})`)

console.log(`final answer: ${parseInt(gamma, 2) * parseInt(sigma, 2)}`)
