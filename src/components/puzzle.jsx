import React from 'react';
import Cell from './cell';
import StaticCell from './staticCell';
import { connect } from 'react-redux';


function Puzzle(props) {
    const length = props.isSizeSmall ? 64 : 90;
    let styles = {
        height: (props.height * length) + 'px',
        width: (props.width * length) + 'px',
        gridTemplateColumns: 'repeat(' + props.width + ', 1fr)',
        gridTemplateRows: 'repeat(' + props.height + ', 1fr)'
    }
    const puzzleCells = [];

    props.puzzleData.forEach((value, index) => {
        value.forEach((innerVal, innerIndex) => {
            let imageFile = null;

            if (innerVal[1] !== null) {
                imageFile = props.pieces[innerVal[1]];
            }

            if (innerVal[3] || props.solved) {
                puzzleCells.push(
                    <StaticCell
                        key={'cell' + index + innerIndex}
                        border={innerVal[0]}
                        imageFile={imageFile}
                        fixed={innerVal[3]}
                        id={index + '-' + innerIndex}
                    />
                );
            } else {
                puzzleCells.push(
                    <Cell
                        key={'cell' + index + innerIndex}
                        border={innerVal[0]}
                        fixed={innerVal[3]}
                        imageFile={imageFile}
                        id={index + '-' + innerIndex}
                        solved={props.solved}
                    />
                );
            }
        })
    });

    return (
        <div id="puzzle-container" className={props.isSizeSmall ? 'small' : null} style={styles}>
            {puzzleCells}
        </div>
    );
}

const mapStateToProps = (state) => ({
    isSizeSmall: state.isSizeSmall,
    height: state.height,
    width: state.width,
    pieces: state.pieces,
    puzzleData: state.currentPuzzle,
    solved: state.solved
});

export default connect(mapStateToProps)(Puzzle);
