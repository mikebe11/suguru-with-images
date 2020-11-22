import React from 'react';
import { connect } from 'react-redux';
import {
    initialize,
    setSessionStorage,
    resetPuzzle,
    setSolved,
    undoLastStep,
    solvePuzzle
} from '../redux/actionCreators';
import Puzzle from './puzzle';
import Controls from './controls';
import Button from '../components/button';
import SolvedStatus from '../components/solvedStatus';
import SizeDropDowns from '../components/sizeDropDown';
import PuzzleClass from '../puzzleClass';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.checkSolutionHandler = this.checkSolutionHandler.bind(this);
        this.checkSolutionState = this.checkSolutionState.bind(this);

        this.props.initialize();

        window.sessionStorage.setItem('puzzle', JSON.stringify({ p: [] }));

        const test = window.sessionStorage.getItem('puzzle');

        if (test === null) {
            this.props.setSessionStorage(false);
        } else {
            this.props.setSessionStorage(true);
        }
    }

    checkSolutionHandler() {
        const p = new PuzzleClass(this.props.height, this.props.width, this.props.puzzle);

        const puzzleIsSolved = p.checkPuzzle();

        if (puzzleIsSolved) {
            this.props.setSolved(true);
        } else {
            this.props.setSolved(false);
        }
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
                <Puzzle/>
                <Controls/>
                <div id="mobile-button-container">
                    <div>
                        {
                            this.props.hasSessionStorage ?
                                <Button
                                    text="undo"
                                    click={this.props.undoLastStep}
                                    disabled={
                                        !this.props.touched ||
                                        this.props.solved ||
                                        this.props.storageCount === 0
                                    }
                                /> :
                                null
                        }
                        <SolvedStatus
                            click={this.checkSolutionHandler}
                            disabled={this.props.solved || this.checkSolutionState()}
                            showVerifiedImage={this.props.showVerifiedImage}
                        />
                    </div>
                    <div>
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
                    </div>
                    <SizeDropDowns/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
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
    setSessionStorage,
    resetPuzzle,
    setSolved,
    undoLastStep,
    solvePuzzle
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
