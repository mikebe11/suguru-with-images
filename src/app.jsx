import React from 'react';
import { connect } from 'react-redux';
import {
    initialize,
    setDisplaySize,
    setSessionStorage,
    resetPuzzle,
    setSolved,
    undoLastStep,
    solvePuzzle
} from './redux/actionCreators';
import Puzzle from './components/puzzle';
import Picker from './components/picker';
import Button from './components/button';
import SizeDropDowns from './components/sizeDropDown';
import Toggle from './components/toggle';
import Trash from './components/trash';
import PuzzleClass from './puzzleClass';
import SolvedStatus from './components/solvedStatus';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.checkSolutionHandler = this.checkSolutionHandler.bind(this);
        this.checkSolutionState = this.checkSolutionState.bind(this);

        this.props.initialize();

        window.sessionStorage.setItem('puzzle', JSON.stringify({ p: [] }));

        let hasSessionStorage = window.sessionStorage.getItem('puzzle');

        if (hasSessionStorage === null) {
            this.props.setSessionStorage(false);
        } else {
            this.props.setSessionStorage(true);
        }
    }

    checkSolutionHandler() {
        let p = new PuzzleClass(this.props.height, this.props.width, this.props.puzzle);

        let puzzleIsSolved = p.checkPuzzle();

        this.props.setSolved(puzzleIsSolved);
    }

    checkSolutionState() {
        let result = false;

        outerLoop:
            for (let y = 0; y < this.props.height; y++) {
                for (let x = 0; x < this.props.width; x++) {
                    if (this.props.puzzle[y][x][1] === null) {
                        result = true;
                        break outerLoop;
                    }
                }
            }

        return result;
    }

    render() {
        return (
            <div>
                <div id="button-container">
                    <SizeDropDowns/>
                    <Toggle
                        leftOption="small"
                        rightOption="large"
                        position={this.props.isSizeSmall ? ' left' : 'right'}
                        click={this.props.setDisplaySize}
                    />
                    <Button
                        text="reset"
                        click={this.props.resetPuzzle}
                        disabled={!this.props.touched || this.props.solved}
                    />
                    <Button
                        text="solve it"
                        click={this.props.solvePuzzle}
                        disabled={this.props.solved}
                    />
                    {
                        this.props.hasSessionStorage ?
                            <Button
                                text="undo"
                                click={this.props.undoLastStep}
                                disabled={!this.props.touched ||
                                    this.props.solved ||
                                    this.props.storageCount === 0}
                            /> :
                            null
                    }
                    <SolvedStatus
                        click={this.checkSolutionHandler}
                        disabled={this.props.solved || this.checkSolutionState()}
                        showVerifiedImage={this.props.showVerifiedImage}
                    />
                </div>
                <Puzzle/>
                <div id="piece-container" className={this.props.isSizeSmall ? 'small' : 'large'}>
                    <Picker/>
                    <Trash/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isSizeSmall: state.isSizeSmall,
    hasSessionStorage: state.hasSessionStorage,
    storageCount: state.storageCount,
    height: state.height,
    width: state.width,
    puzzle: state.currentPuzzle,
    touched: state.touched,
    solved: state.solved,
    showVerifiedImage: state.showVerifiedImage
});

const mapDispatchToProps = {
    initialize,
    setDisplaySize,
    setSessionStorage,
    resetPuzzle,
    setSolved,
    undoLastStep,
    solvePuzzle
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
