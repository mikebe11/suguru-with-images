import React from 'react';
import { connect } from 'react-redux';
import { updatePuzzlePiece } from '../redux/actionCreators';


class StaticCell extends React.Component {
    constructor(props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(event) {
        event.preventDefault();
        event.stopPropagation();
 
        if ((this.props.imageFile !== null || this.props.imageAction !== false) &&
            this.props.imageFile !== this.props.imageAction)
        {
            this.props.imageAction === false ?
                this.props.updatePuzzlePiece(this.props.id, null) :
                this.props.updatePuzzlePiece(this.props.id, this.props.imageAction);
        }
    }

    render() {
        const src = `./images/${this.props.imageFile}`;
        const classes = 'cell mobile border-' + this.props.border;

        return (this.props.solved) ?
            (
                <div
                    id={this.props.id}
                    className={classes}
                >
                    <img
                        src={src}
                        className="piece"
                        alt=""
                    />
                </div>
            ) :
            // Using two event handlers here isn't desirable but deleting an image will select the cell
            //   in some mobile browsers. touchStart is for adding an image and onClick is for deleting
            (
                <div
                    id={this.props.id}
                    className={classes}
                    onTouchStart={this.props.imageFile === null ? this.clickHandler : null}
                    onClick={this.props.imageFile === null ? null : this.clickHandler}
                >
                    {this.props.imageFile === null ?
                        null :
                        <img
                            src={src}
                            className="piece"
                            alt=""
                        />
                    }
                </div>
            )
    }
}

const mapStateToProps = (state) => ({
    imageAction: state.imageAction,
    solved: state.solved
});

const mapDispatchToProps = {
    updatePuzzlePiece
};

export default connect(mapStateToProps, mapDispatchToProps)(StaticCell);
