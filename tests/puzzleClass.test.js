import testClass from '../src/puzzleClass';


const width = 5;
const height = 5;
const puzzle = [
    [
        [3,0,1,0],
        [6,3,1,0],
        [11,0,2,1],
        [2,2,2,0],
        [6,4,2,0]
    ],
    [
        [1,1,1,1],
        [12,2,1,0],
        [7,4,3,0],
        [9,1,2,1],
        [12,3,2,0]
    ],
    [
        [13,4,1,0],
        [11,0,3,0],
        [0,3,3,0],
        [14,2,3,1],
        [7,4,4,0]
    ],
    [
        [3,3,5,1],
        [6,2,5,0],
        [13,1,3,0],
        [3,0,4,0],
        [4,3,4,1]
    ],
    [
        [9,1,5,0],
        [8,0,5,0],
        [14,4,5,1],
        [9,2,4,0],
        [12,1,4,0]
    ]
];
let smallMatrix = [
    [
        [null,0,1],[null,1,1],[null,2,1]
    ],
    [
        [null,3,1],[null,4,1],[null,0,2]
    ],
    [
        [null,1,2],[null,2,2],[null,3,2]
    ]
];

describe('checkCell()', () => {

    const puzzleAsString = JSON.stringify(smallMatrix);
    const newMatrix = JSON.parse(puzzleAsString);

    newMatrix[1][1][1] = 0;

    test('should return true', () => {
        const instanceWithSmallMatrix = new testClass(3, 3, smallMatrix);

        expect(instanceWithSmallMatrix.checkCell(1, 1)).toBe(true);
    });

    test('same element in adjacent cell should return false', () => {    
        const instance = new testClass(3, 3, newMatrix);
        
        expect(instance.checkCell(1, 1)).toBe(false);
    });

    test('should return true', () => {
        const instance = new testClass(3, 3, newMatrix);

        expect(instance.checkCell(0, 1)).toBe(true);
    });

    test('same element in lower left cell should return false', () => {
        const instance = new testClass(3, 3, newMatrix);

        expect(instance.checkCell(0, 0)).toBe(false);
    });

});

describe('checkCages()', () => {

    const puzzleAsString = JSON.stringify(smallMatrix);
    const newMatrix = JSON.parse(puzzleAsString);

    newMatrix[0][0] = [null, 2, 1];

    test('should return true', () => {
        const instance = new testClass(3, 3, smallMatrix);

        instance.checkForProximity();

        expect(instance.checkCages()).toBe(true);
    });

    test('duplicate elements in a cage should return false', () => {
        const instance = new testClass(3, 3, newMatrix);

        instance.checkForProximity();

        expect(instance.checkCages()).toBe(false);
    });

});

describe('checkPuzzle()', () => {

    test('valid puzzle should return true', () => {
        const validInstance = new testClass(height, width, puzzle);

        expect(validInstance.checkPuzzle()).toBe(true);
    });

    test('invalid puzzle should return false', () => {
        const puzzleAsString = JSON.stringify(puzzle);
        const newPuzzle = JSON.parse(puzzleAsString);
        newPuzzle[2][3][1] = 4;

        const temp = new testClass(height, width, newPuzzle);
        
        expect(temp.checkPuzzle()).toBe(false);
    });
    
});
