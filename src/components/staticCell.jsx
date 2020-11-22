import React from 'react';


export default function StaticCell(props) {
    let classes = ['cell', 'border-' + props.border];

    if (props.fixed) {
        classes.push('fixed');
    }

    return (
        <div id={props.id} className={classes.join(' ')}>
            <img
                src={`./images/${props.imageFile}`}
                className="piece"
                alt=""
            />
        </div>
    );
}
