const { readFileSync } = require('fs');
const { EOL } = require('os');
const path = require('path');

const INPUT = readFileSync(path.join(__dirname, './input.txt')).toString();
const tokens = INPUT.split(EOL);
const coords = tokens.map((line) => {
    const [set1, set2] = line.split(' -> ');
    return [set1.split(',').map(Number), set2.split(',').map(Number)];
});

let numbers = [
    ...new Set(
        tokens.reduce((prev, curr) => {
            const [set1, set2] = curr.split(' -> ');
            return [
                ...prev,
                ...set1.split(',').map(Number),
                ...set2.split(',').map(Number),
            ];
        }, [])
    ),
];
const largestNumber = Math.max(...numbers);

let result = new Array(largestNumber + 1);

for (let i = 0; i < largestNumber + 1; i++) {
    result[i] = new Array(largestNumber + 1).fill(0);
}

for (let set of coords) {
    [[x1, y1], [x2, y2]] = set;
    if (x1 === x2) {
        const start = Math.min(y1, y2);
        const end = Math.max(y1, y2);

        for (i = start; i <= end; i++) {
            result[i][x1] += 1;
        }
    } else if (y1 === y2) {
        const start = Math.min(x1, x2);
        const end = Math.max(x1, x2);

        for (i = start; i <= end; i++) {
            result[y1][i] += 1;
        }
    } else {
        const slope = (y2 - y1) / (x2 - x1);
        const upwards = slope < 0;

        if (upwards) {
            const startX = Math.min(x1, x2);
            const endX = Math.max(x1, x2);
            let yPos = Math.max(y1, y2);
            let xPos = yPos === y1 ? x1 : x2;

            for (i = startX; i <= endX; i++) {
                result[yPos][xPos] += 1;
                xPos++;
                yPos--;
            }
        } else {
            const startX = Math.min(x1, x2);
            const endX = Math.max(x1, x2);
            let yPos = Math.min(y1, y2);
            let xPos = yPos === y1 ? x1 : x2;

            for (i = startX; i <= endX; i++) {
                result[yPos][xPos] += 1;
                yPos++;
                xPos++;
            }
        }
    }
}

const lineCrossings = result.reduce((prev, curr) => {
    const tempSum = curr.reduce((p, c) => {
        if (c > 1) {
            return p + 1;
        }

        return p;
    }, 0);

    return prev + tempSum;
}, 0);

console.log(lineCrossings);
