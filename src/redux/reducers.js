import isEqual from 'lodash.isequal';


const initialState = {
    isSizeSmall: false,         // puzzle's screen display size
    hasSessionStorage: null,    // does the browser have session storage?
    storageCount: 0,            // number of undos in session storage
    touched: false,             // whether any moves have been made
    showVerifiedImage: null,    // true, false, null
    solved: false,              // puzzle's solved status
    puzzleIndex: 1,             // puzzle's index in the database
    width: 0,                   // puzzle cell width
    height: 0,                  // puzzle cell height
    pieces: [],                 // list of piece file names
    puzzle: [],                 // main puzzle object [[[border, filename, cage, fixed]]]
    currentPuzzle: [],          // current puzzle object which changes with drops
    solution: null,             // solution array
    sizes: {},                  // number of each type of puzzle
    puzzleIsLoading: true,      // loading flag
    imageAction: false          // action taken on mobile when clicking a piece (image file or false = trash)
};


export default (state = initialState, action) => {
    switch (action.type) {
        case 'INITIALIZE':

            let currentPuzzle = JSON.stringify(suguru.data.p);
            currentPuzzle = JSON.parse(currentPuzzle);

            return Object.assign({}, state, {
                height: suguru.height,
                width: suguru.width,
                puzzle: suguru.data.p,
                currentPuzzle,
                solution: suguru.data.s,
                pieces: suguru.data.u,
                sizes: suguru.sizes,
                puzzleIsLoading: false
            });
        case 'SET_DISPLAY_SIZE':
            return Object.assign({}, state, { isSizeSmall: !state.isSizeSmall });
        case 'SESSION_STORAGE':
            return Object.assign({}, state, { hasSessionStorage: action.value });
        case 'RESET':
            let resetPuzzle = JSON.stringify(state.puzzle);
            resetPuzzle = JSON.parse(resetPuzzle);

            return Object.assign({}, state, {
                currentPuzzle: resetPuzzle,
                storageCount: 0,
                touched: false
            });
        case 'UPDATE_PIECE':
            let x = action.id.split('-');

            let newcurrentPuzzle = JSON.stringify(state.currentPuzzle);
            newcurrentPuzzle = JSON.parse(newcurrentPuzzle);

            // Whether the current state of the puzzle object is any different from initial state.
            let touched = true;
            let imageFileIndex = (action.imageFile === null) ? null : state.pieces.indexOf(action.imageFile);

            newcurrentPuzzle[x[0]][x[1]][1] = imageFileIndex;

            // When we remove a piece we check to see if it was the first piece
            //   and we're back to the initial puzzle state.
            if (action.imageFile === null && isEqual(state.puzzle, newcurrentPuzzle)) {
                touched = false;
                window.sessionStorage.setItem('puzzle', JSON.stringify({p: []}));
            }

            return Object.assign({}, state, {
                currentPuzzle: newcurrentPuzzle,
                touched,
                storageCount: action.length
            });
        case 'SET_SOLVED':
            return Object.assign({}, state, {
                solved: action.result,
                showVerifiedImage: action.result
            });
        case 'UNSET_VERIFIED_IMAGE':
            return Object.assign({}, state, { showVerifiedImage: null });
        case 'UNDO':
            touched = !(isEqual(action.puzzle, state.puzzle));

            return Object.assign({}, state, {
                currentPuzzle: action.puzzle,
                storageCount: state.storageCount - 1,
                touched
            });
        case 'SOLVE':
            let solvedPuzzle = [...state.puzzle];

            for (let y = 0; y < state.height; y++) {
                for (let x = 0; x < state.width; x++) {
                    solvedPuzzle[y][x][1] = state.solution[y][x];
                }
            }

            return Object.assign({}, state, {currentPuzzle: solvedPuzzle, solved: true});
        case 'SET_NEW_PUZZLE':
            return Object.assign({}, state, {
                touched: false,
                solved: false,
                height: parseInt(action.height, 10),
                width: parseInt(action.width, 10),
                puzzleIndex: action.id,
                pieces: action.data.u,
                puzzle: action.data.p,
                currentPuzzle: action.data.p,
                solution: action.data.s,
                puzzleIsLoading: false,
                showVerifiedImage: null,
                imageAction: false
            });
        case 'PUZZLE_IS_LOADING':
            return Object.assign({}, state, { puzzleIsLoading: true });
        case 'CHANGE_MOBILE_ACTION':
            let mobileAction = false;

            if (action.action !== false) {
                mobileAction = action.action;
            }

            return Object.assign({}, state, { imageAction: mobileAction });
        default:
            return state;
    }
};