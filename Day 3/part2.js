const { readFileSync } = require('fs');
const { EOL } = require('os');
const path = require('path');

const INPUT = readFileSync(path.join(__dirname, './input.txt')).toString();

const MOCK_INPUT = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

const binaryStrings = INPUT.split(EOL);
// const binaryStrings = MOCK_INPUT.split('\n');
const binaryStringLength = binaryStrings[0].length;

let oxygenGeneratorRatingNumbers = [...binaryStrings];

for (let i = 0; i < binaryStringLength; i++) {
    const onesArray = oxygenGeneratorRatingNumbers.filter((binaryString) => {
        return binaryString[i] === '1';
    });

    onesCount = onesArray.length;
    const zerosCount = oxygenGeneratorRatingNumbers.length - onesCount;

    if (onesCount >= zerosCount) {
        oxygenGeneratorRatingNumbers = [...onesArray];
    } else {
        oxygenGeneratorRatingNumbers = oxygenGeneratorRatingNumbers.filter(
            (v) => v[i] === '0'
        );
    }

    console.log(oxygenGeneratorRatingNumbers);

    if (oxygenGeneratorRatingNumbers.length === 1) {
        break;
    }
}

let co2ScrubberRatingNumbers = [...binaryStrings];

for (let i = 0; i < binaryStringLength; i++) {
    const onesArray = co2ScrubberRatingNumbers.filter((binaryString) => {
        return binaryString[i] === '1';
    });

    onesCount = onesArray.length;
    const zerosCount = co2ScrubberRatingNumbers.length - onesCount;

    if (onesCount < zerosCount) {
        co2ScrubberRatingNumbers = [...onesArray];
    } else {
        co2ScrubberRatingNumbers = co2ScrubberRatingNumbers.filter(
            (v) => v[i] === '0'
        );
    }

    console.log(co2ScrubberRatingNumbers);

    if (co2ScrubberRatingNumbers.length === 1) {
        break;
    }
}

const oxygenGeneratorRating = Number.parseInt(
    oxygenGeneratorRatingNumbers[0],
    2
);

const co2ScrubberRating = Number.parseInt(
    co2ScrubberRatingNumbers[0],
    2
);

console.log(oxygenGeneratorRating * co2ScrubberRating);
