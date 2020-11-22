import React from 'react';


export default function FixedCell(props) {
    const classes = 'cell fixed mobile border-' + props.border;

    return (
        <div id={props.id} className={classes}>
            <img
                src={`./images/${props.imageFile}`}
                className="piece"
                alt=""
            />
        </div>
    );
}
