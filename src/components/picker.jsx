import React from 'react';
import { connect } from 'react-redux';
import DraggableImage from './draggableImage';


function Picker(props) {
    return (
        <div id="picker">
            {props.pieces.map((imageFile, index) => (
                <div key={'picker' + index}>
                    <span>{index + 1}.</span>
                    <DraggableImage imageFile={imageFile} />
                </div>
            ))}
        </div>
    );
}

const mapStateToProps = (state) => ({
    pieces: state.pieces
});

export default connect(mapStateToProps)(Picker);
