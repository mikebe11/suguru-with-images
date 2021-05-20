import React from 'react';
import { useDrag } from 'react-dnd';
import { connect } from 'react-redux';
import { updatePuzzlePiece } from '../redux/actionCreators';


function DraggablePlacedImage(props) {
    const [{isDragging}, drag] = useDrag({
        type: 'set_piece',
        item: { id: props.cellID },
        end: (item, monitor) => {
            if (monitor.didDrop()) {
                props.updatePuzzlePiece(item.id, null);
            }
        } 
    });

    return (
        <img
            ref={drag}
            data-id={props.id}
            src={`./images/${props.imageFile}`}
            className={'piece draggable'}
            alt=""
        />
    );
};

const mapDispatchToProps = {
    updatePuzzlePiece
};

export default connect(null, mapDispatchToProps)(DraggablePlacedImage);
