import React from 'react';


export default function DropDown(props) {
    return (
        <select
            onChange={props.change}
            value={props.value}
        >
            {props.options.map((item) => (
                <option key={item} value={item}>{item}</option>
            ))}
        </select>
    );
}
