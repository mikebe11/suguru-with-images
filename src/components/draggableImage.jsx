import React from 'react';
import { connect } from 'react-redux';
import { updatePuzzlePiece } from '../redux/actionCreators';
import { useDrag } from 'react-dnd';


function DraggableImage(props) {
    const [{isDragging}, drag] = useDrag({
        item: {
            type: 'piece',
            id: props.imageFile
        },
        end: (item, monitor) => {
            if (monitor.didDrop()) {
                props.updatePuzzlePiece(monitor.getDropResult().id, item.id);
            }
        } 
    });

    return (
        <img
            ref={drag}
            src={`./images/${props.imageFile}`}
            className={'piece draggable'}
            alt=""
        />
    );
};

const mapDispatchToProps = {
    updatePuzzlePiece
};

export default connect(null, mapDispatchToProps)(DraggableImage);
