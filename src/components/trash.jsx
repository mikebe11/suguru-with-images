import React from 'react';
import { useDrop } from 'react-dnd';


export default function Trash(props) {
    const [{isOver}, drop] = useDrop({
        accept: 'set_piece',
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    const src = './images/wastebasket.png';

    return (
        <div
            ref={drop}
            id="trash"
            className={isOver ? 'trash-hover' : null}
        >
            <img
                src={src}
                className="piece"
                alt=""
            />
        </div>
    );
}
