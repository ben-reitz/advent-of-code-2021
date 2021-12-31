import { parseInputFile } from '../../lib/utils.js';

const input = parseInputFile('./solutions/day-3/input.txt')

const diagnostics = input.split('\n');

const ratingCalculator = (comparator) => {
    let remainingReadings = [...diagnostics];

    for (let i = 0; i < diagnostics[0].length; i++) {
        let numZeros = 0
        let numOnes = 0
        for (const diagnostic of remainingReadings) {
            switch (diagnostic.charAt(i)) {
                case '0':
                    numZeros++;
                    break;
                case '1':
                    numOnes++;
                    break;
                default:
                    throw new Error('invalid diagnostic value');
            }
        }

        // this calculation is the only difference between the two ratings - pass in the comparator as a fn
        const permittedValue = comparator(numZeros, numOnes);

        remainingReadings = remainingReadings.filter(reading => reading.charAt(i) === permittedValue)

        if (remainingReadings.length === 1) {
            return remainingReadings[0]
        } else if (remainingReadings.length < 1) {
            throw new Error('remaining readings is less than 1')
        }
    }
}

const oxygenComparator = (numZeros, numOnes) => numZeros > numOnes ? '0' : '1';
const co2Comparator = (numZeros, numOnes) => numZeros <= numOnes ? '0' : '1';

const o2GeneratorRating = ratingCalculator(oxygenComparator);
const co2GeneratorRating = ratingCalculator(co2Comparator);

console.log(`o2 gen rating (decimal): ${o2GeneratorRating} (${parseInt(o2GeneratorRating, 2)})`)
console.log(`co2 gen rating (decimal): ${co2GeneratorRating} (${parseInt(co2GeneratorRating, 2)})`)

console.log(`Final answer: ${parseInt(o2GeneratorRating, 2) * parseInt(co2GeneratorRating, 2)}`)
