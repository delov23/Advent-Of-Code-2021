const fs = require('fs');
const { EOL } = require('os');
const path = require('path');

const INPUT = fs.readFileSync(path.join(__dirname, './input.txt')).toString();

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
const binaryStringLength = binaryStrings[0].length;

let gammaRateBinaryString = '';

for (let i = 0; i < binaryStringLength; i++) {
    const onesCount = binaryStrings.filter((binaryString) => {
        return binaryString[i] === '1';
    }).length;

    if (onesCount > binaryStrings.length - onesCount) {
        gammaRateBinaryString += '1';
    } else {
        gammaRateBinaryString += '0';
    }
}

const gammaRate = Number.parseInt(gammaRateBinaryString, 2);
const epsilonRateBinaryString = gammaRateBinaryString
    .replace(/1/g, '2')
    .replace(/0/g, '1')
    .replace(/2/g, '0');
const epsilonRate = Number.parseInt(epsilonRateBinaryString, 2);

console.log(gammaRate * epsilonRate);
