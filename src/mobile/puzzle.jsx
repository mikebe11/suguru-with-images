import React from 'react';
import { connect } from 'react-redux';
import StaticCell from './staticCell';
import FixedCell from './fixedCell';


class Puzzle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            puzzleWidth: 0
        };

        this.getDimensions = this.getDimensions.bind(this);
    }

    componentDidMount() {
        this.getDimensions();

        window.addEventListener('resize', this.getDimensions);
    }

    getDimensions() {
        const width = (window.innerWidth < window.innerHeight) ? window.innerWidth : window.innerHeight;
    
        this.setState({
            puzzleWidth: Math.round(width - 32)
        });
    }

    render() {
        const cellWidth = Math.round(this.state.puzzleWidth / this.props.width);
        let styles = {
            height: (cellWidth * this.props.height) + 'px',
            width: this.state.puzzleWidth + 'px',
            gridTemplateColumns: 'repeat(' + this.props.width + ', 1fr)',
            gridTemplateRows: 'repeat(' + this.props.height + ', 1fr)'
        };
        const puzzleCells = [];

        this.props.puzzleData.forEach((value, index) => {
            value.forEach((innerVal, innerIndex) => {
                let imageFile = null;

                if (innerVal[1] !== null) {
                    imageFile = this.props.pieces[innerVal[1]];
                }
                if (innerVal[3]) {
                    puzzleCells.push(
                        <FixedCell
                            key={'cell' + index + innerIndex}
                            border={innerVal[0]}
                            imageFile={imageFile}
                            id={index + '-' + innerIndex}
                        />
                    );
                } else {
                    puzzleCells.push(
                        <StaticCell
                            key={'cell' + index + innerIndex}
                            border={innerVal[0]}
                            imageFile={imageFile}
                            id={index + '-' + innerIndex}
                        />
                    );
                }
            });
        });

        return (
            <div
                id="puzzle-container"
                className="mobile"
                style={styles}
            >
                {puzzleCells}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    height: state.height,
    width: state.width,
    pieces: state.pieces,
    puzzleData: state.currentPuzzle
});

export default connect(mapStateToProps)(Puzzle);
