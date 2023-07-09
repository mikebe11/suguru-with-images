export const initialize = () => ({
    type: 'INITIALIZE'
});

export const setDisplaySize = () => ({
    type: 'SET_DISPLAY_SIZE'
});

export const setSessionStorage = (value) => ({
    type: 'SESSION_STORAGE',
    value
});

export const updatePiece = (id, imageFile, length = 0) => ({
    type: 'UPDATE_PIECE',
    id,
    imageFile,
    length
});

export const setSolved = (result) => ({
    type: 'SET_SOLVED',
    result
});

export const unsetVerifiedImage = () => ({
    type: 'UNSET_VERIFIED_IMAGE'
});

export const puzzleIsLoading = () => ({
    type: 'PUZZLE_IS_LOADING'
});

export const changeMobileAction = (action) => ({
    type: 'CHANGE_MOBILE_ACTION',
    action
});

const reset = () => ({
    type: 'RESET'
});

const undo = (puzzle) => ({
    type: 'UNDO',
    puzzle
});

const solve = () => ({
    type: 'SOLVE'
});

const setNewPuzzle = (height, width, id, data) => ({
    type: 'SET_NEW_PUZZLE',
    height,
    width,
    id,
    data
});

/**
 * This function will compile an array of just puzzle piece filename indexes
 *   for inserting into session storage.
 *
 * @param {number[][][]} puzzle
 * @return {Array}
 */
const getJustPuzzleData = (puzzle) => {
    let data = [];
    let temp = [];

    for (let y = 0; y < puzzle.length; y++) {
        temp = [];

        for (let x = 0; x < puzzle[0].length; x++) {
            temp.push(puzzle[y][x][1]);
        }

        data.push(temp);
    }

    return data;
};

/**
 * Add the updated puzzle layout array to session storage
 *   and return the amount of storage elements.
 *
 * @param {number[][][]} puzzle
 * @return {Promise<any>}
 */
const setStorageThunk = (puzzle) => {
    return new Promise((resolve, reject) => {
        let storageObject = window.sessionStorage.getItem('puzzle');
        let newData = getJustPuzzleData(puzzle);

        if (storageObject === null) {
            window.sessionStorage.setItem('puzzle', JSON.stringify({'p': [newData]}));

            resolve(1);
        } else {
            let u = JSON.parse(storageObject);

            if (u.p.length === 15) {
                u.p.shift();
            }

            u.p.push(newData);

            window.sessionStorage.setItem('puzzle', JSON.stringify(u));

            resolve(u.p.length);
        }
    });
};

/**
 * Thunk for updating the puzzle on a piece drop.
 *
 * @param {string} id
 * @param {string} imageFile
 * @return {Object}
 */
export const updatePuzzlePiece = (id, imageFile) => (
    (dispatch, getState) => {

        if (getState().hasSessionStorage) {
            return setStorageThunk(getState().currentPuzzle)
                .then((length) => {
                    dispatch(updatePiece(id, imageFile, length));
                });
        } else {
            dispatch(updatePiece(id, imageFile));
        }
    }
);

/**
 * Thunk for the reset button.
 *
 * @return {Object}
 */
export const resetPuzzle = () => (
    (dispatch, getState) => {

        if (getState().hasSessionStorage) {
            window.sessionStorage.setItem('puzzle', JSON.stringify({p: []}));  
        }
            
        dispatch(reset());
    }
);

/**
 * Thunk for the solve puzzle button.
 *
 * @return {Object}
 */
export const solvePuzzle = () => (
    (dispatch, getState) => {

        if (getState().hasSessionStorage) {

            window.sessionStorage.setItem('puzzle', JSON.stringify({p: []}));

            dispatch(solve());
        }
    }
);

/**
 * Pop a puzzle layout off the session storage object and return it.
 *
 * @param {number[][][]} puzzle
 * @return {Promise<any>}
 */
const undoStorage = (puzzle) => {
    return new Promise((resolve, reject) => {
        let p = window.sessionStorage.getItem('puzzle');

        if (p === null) {
            resolve(false);
        }

        let json = JSON.parse(p);

        let undoData = json.p.pop();

        if (typeof undoData !== 'undefined') {

            window.sessionStorage.setItem('puzzle', JSON.stringify(json));

            let newPuzzle = JSON.stringify(puzzle);
            newPuzzle = JSON.parse(newPuzzle);

            for (let y = 0; y < puzzle.length; y++) {
                for (let x = 0; x < puzzle[0].length; x++) {
                    newPuzzle[y][x][1] = undoData[y][x];
                }
            }

            resolve(newPuzzle);
        }

        resolve(false);
    });
};

/**
 * Thunk for the undo button.
 *
 * @return {Object}
 */
export const undoLastStep = () => (
    (dispatch, getState) => {
        undoStorage(getState().puzzle)
            .then((result) => {
                if (result !== false) {
                    dispatch(undo(result));
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }
);

/**
 * Load a new puzzle from the database.
 *
 * @param {number} width
 * @param {number} height
 * @param {number} id
 * @return {Object}
 */
export const changePuzzle = (width, height, id) => (
    (dispatch, getState) => {
        dispatch(puzzleIsLoading);

        let url = window.location.href;

        if (url.endsWith('.php')) {
            let temp = window.location.pathname.split('/');

            temp.pop();

            url = window.location.origin + temp.join('/') + '/';
        }

        url += `puzzles.php?id=${id}&w=${width}&h=${height}`;

        return fetch(
                url,
                {
                    method: 'GET',
                    cache: 'force-cache',
                    credentials: 'same-origin'
                }
            )
            .then((response) => (
                response.json()
            ))
            .then((response) => {
                window.sessionStorage.setItem('puzzle', JSON.stringify({p: []}));

                dispatch(setNewPuzzle(height, width, id, response.data));
            })
            .catch((error) => {
                console.error(error);
            });
    }
);
