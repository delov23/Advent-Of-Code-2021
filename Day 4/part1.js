const { readFileSync } = require('fs');
const { EOL } = require('os');
const path = require('path');

const INPUT = readFileSync(path.join(__dirname, './input.txt')).toString();
const tokens = INPUT.split(EOL);
const numbers = tokens.shift().split(',').map(Number);

const inputLines = tokens
    .map((line) => {
        if (line) {
            return line
                .split(/\s+/gm)
                .filter((item) => item !== '')
                .map(Number);
        }
    })
    .filter((line) => line !== undefined);

let matrices = [];

for (let i = 0; i < inputLines.length; i += 5) {
    matrices.push([
        inputLines[i],
        inputLines[i + 1],
        inputLines[i + 2],
        inputLines[i + 3],
        inputLines[i + 4],
    ]);
}

let winningNumber;

outer: for (let numberIndex = 4; numberIndex < numbers.length; numberIndex++) {
    const number = numbers[numberIndex];
    winningNumber = number;

    for (let matrixIndex = 0; matrixIndex < matrices.length; matrixIndex++) {
        const matrix = matrices[matrixIndex];

        // horizontal search
        for (line of matrix) {
            let counter = 0;
            if (line.indexOf(number) !== -1) {
                counter++;
                for (i = numberIndex - 1; i >= 0; i--) {
                    if (line.indexOf(numbers[i]) !== -1) {
                        counter++;
                    }
                }

                if (counter === 5 && matrices.length > 1) {
                    matrices = matrices.filter((m, mi) => mi !== matrixIndex);
                }

                if (matrices.length === 1) {
                    break outer;
                }
            }
        }

        if (matrices.length === 1) {
            break outer;
        }

        // vertical search
        for (j = 0; j < 5; j++) {
            const line = matrix.map((el) => el[j]);
            let counter = 0;
            if (line.indexOf(number) !== -1) {
                counter++;
                for (i = numberIndex - 1; i >= 0; i--) {
                    if (line.indexOf(numbers[i]) !== -1) {
                        counter++;
                    }
                }

                if (counter === 5 && matrices.length > 1) {
                    matrices.filter((m, mi) => mi !== matrixIndex);
                } 

                if (matrices.length === 1) {
                    break outer;
                }
            }
        }

        if (matrices.length === 1) {
            break outer;
        }
    }
}

const winningNumbers = numbers.slice(0, numbers.indexOf(winningNumber) + 1);
const winningMatrix = matrices[0];

console.log(winningMatrix);
console.log(winningNumber);

let sum = 0;
console.log(winningNumbers);

winningMatrix.forEach((line) => {
    line.forEach((item) => {
        if (!winningNumbers.includes(item)) {
            sum += item;
        }
    });
});

console.log(sum * winningNumber);
