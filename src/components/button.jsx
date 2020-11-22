import React from 'react';


export default function Button(props) {
    const classes = props.disabled ? 'button disabled' : 'button';
    const style = (typeof props.style === 'undefined') ? null : props.style;

    return (
        <div
            style={style}
            className={classes}
            onClick={props.click}
        >
            {props.text}
        </div>
    );
}