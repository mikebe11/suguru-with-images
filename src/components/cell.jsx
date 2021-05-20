import React from 'react';
import DraggablePlacedImage from './draggablePlacedImage';
import { useDrop } from 'react-dnd'


export default function Cell(props) {
    const [{isOver}, drop] = useDrop({
        accept: 'piece',
        collect: (monitor) => ({
            isOver: monitor.isOver()
        }),
        drop: (item, monitor) => ({
            id: props.id
        })
    });

    const preventDefault = (e) => e.preventDefault();

    let classes = ['cell', 'border-' + props.border];

    if (props.imageFile === null) {
        // Return an empty drop target cell.
        
        if (isOver) {
            classes.push('cell-hover');
        }

        return (
            <div
                ref={drop}
                id={props.id}
                onDrop={preventDefault}
                className={classes.join(' ')}
            />
        );

    } else {
        // Return a cell with a draggable image that can be deleted.
        return (
            <div id={props.id} className={classes.join(' ')}>
                <DraggablePlacedImage cellID={props.id} imageFile={props.imageFile} />
            </div>
        );
    }
}
