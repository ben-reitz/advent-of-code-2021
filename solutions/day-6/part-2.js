const input = `1,3,4,1,1,1,1,1,1,1,1,2,2,1,4,2,4,1,1,1,1,1,5,4,1,1,2,1,1,1,1,4,1,1,1,4,4,1,1,1,1,1,1,1,2,4,1,3,1,1,2,1,2,1,1,4,1,1,1,4,3,1,3,1,5,1,1,3,4,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,5,2,5,5,3,2,1,5,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,5,1,1,1,1,5,1,1,1,1,1,4,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,3,1,2,4,1,5,5,1,1,5,3,4,4,4,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,5,3,1,4,1,1,2,2,1,2,2,5,1,1,1,2,1,1,1,1,3,4,5,1,2,1,1,1,1,1,5,2,1,1,1,1,1,1,5,1,1,1,1,1,1,1,5,1,4,1,5,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,5,4,5,1,1,1,1,1,1,1,5,1,1,3,1,1,1,3,1,4,2,1,5,1,3,5,5,2,1,3,1,1,1,1,1,3,1,3,1,1,2,4,3,1,4,2,2,1,1,1,1,1,1,1,5,2,1,1,1,2`;

const fishMap = new Map();

const lanternFishArr = input.split(',').map(Number);
lanternFishArr.forEach(fish => {
    const newValue = fishMap.get(fish) ? fishMap.get(fish) + 1 : 1;
    fishMap.set(fish, newValue);
});

console.log('starting values:');
console.log(fishMap);

const numDays = 256;

const timePasses = (fishQuantities, numDays) => {
    const newFishQuantities = new Map();

    for (const [dayNumber, quantity] of fishQuantities.entries()) {
        if (dayNumber === 0) {
            const currentValue = newFishQuantities.get(6);
            newFishQuantities.set(6, currentValue ? currentValue + quantity : quantity);
            newFishQuantities.set(8, quantity);
        } else {
            const currentValue = newFishQuantities.get(dayNumber - 1);
            newFishQuantities.set(dayNumber - 1, currentValue ? currentValue + quantity : quantity);
        }
    }
    return numDays > 1 ? timePasses(newFishQuantities, numDays - 1) : newFishQuantities;
};

const finalFish = timePasses(fishMap, numDays);
console.log(`total num fish after ${numDays} days:`);
console.log(Array.from(finalFish.values()).reduce((sumSoFar, val) => sumSoFar + val, 0));
