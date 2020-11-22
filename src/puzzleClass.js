export default class PuzzleClass {

    constructor(height, width, puzzle) {
        this.height = height;
        this.width = width;
        this.puzzle = puzzle;
        this.cageArray = []; // cages start at index 1
    }

    /**
     * Check a cell in the matrix and to see if it's valid.
     * A valid cell is one where the none of the surrounding cells (up to 8)
     *   contain the same puzzle element. 
     *
     * @param {number} x
     * @param {number} y
     * @returns {boolean} 
     */
    checkCell(x, y) {

        // Check the elements in the row above the current cell
        if ((y - 1) >= 0) {

            // Check the element directly above the current cell
            if (this.puzzle[y][x][1] === this.puzzle[y - 1][x][1]) {
                return false;
            }

            // Check the element above and right of the current cell
            if ((x + 1) < this.width && this.puzzle[y][x][1] === this.puzzle[y - 1][x + 1][1]) {
                return false;
            }

            // Check the element above and left of the current cell
            if ((x - 1) >= 0 && this.puzzle[y][x][1] === this.puzzle[y - 1][x - 1][1]) {
                return false;
            }
        }

        // Check the elements in the row below the current cell
        if ((y + 1) < this.height) {

            // Check the element directly below the current cell
            if (this.puzzle[y][x][1] === this.puzzle[y + 1][x][1]) {
                return false;
            }
            
            // Check the element below and right of the current cell
            if ((x + 1) < this.width && this.puzzle[y][x][1] === this.puzzle[y + 1][x + 1][1]) {
                return false;
            }

            // Check the element below and left of the current cell
            if ((x - 1) >= 0 && this.puzzle[y][x][1] === this.puzzle[y + 1][x - 1][1]) {
                return false;
            }
        }

        // Check the element to the right of the current cell
        if ((x + 1) < this.width) {
            if (this.puzzle[y][x][1] === this.puzzle[y][x + 1][1]) {
                return false;
            }
        }

        // Check the element to the left of the current cell
        if ((x - 1) >= 0) {
            if (this.puzzle[y][x][1] === this.puzzle[y][x - 1][1]) {
                return false;
            }
        }

        return true;
    }

    /**
     * Check all cells in the matrix and to see if the current puzzle is valid for proximity.
     * Calls checkCell() on each cell and populates cageArray.
     *
     * @returns {boolean} 
     */
    checkForProximity() {
        let passes = true;

        outerLoop:
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    let temp = this.checkCell(x, y);

                    if (!temp) {
                        passes = false;
                        break outerLoop;
                    }

                    // Initialize the array index if it's undefined.
                    // Add to cage array or set false if cage already has the unicode index.
                    if (typeof this.cageArray[this.puzzle[y][x][2]] === 'undefined') {
                        this.cageArray[this.puzzle[y][x][2]] = [];
                    } else if (this.cageArray[this.puzzle[y][x][2]].indexOf(this.puzzle[y][x][1]) !== -1) {
                        passes = false;
                        break outerLoop;
                    }

                    this.cageArray[this.puzzle[y][x][2]].push(this.puzzle[y][x][1]);
                }
            }

        return passes;
    }

    /**
     * Check the validity of all cages.
     *
     * @returns {boolean} 
     */
    checkCages() {
        let passes = true;

        this.cageArray.forEach((list) => {
            if (passes) {
                list.sort((a, b) => (
                    a - b
                ));

                for (let x = 0; x < list.length; x++) {
                    if (list[x] !== x) {
                        // console.log(list[x]);
                        // console.log(x);
                        passes = false;
                    }
                }
            }
        });

        return passes;
    }

    /**
     * Run all checks to see if a puzzle is valid.
     *
     * @returns {boolean} 
     */
    checkPuzzle() {
        let passes = this.checkForProximity();

        if (passes) {
            passes = this.checkCages();
        }

        return passes;
    }
}