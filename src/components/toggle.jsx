import React from 'react';


export default function Toggle(props) {
    return (
        <div className="toggle-row">
            {props.leftOption}
            <div className="toggle-container">
                <div
                    onClick={props.click}
                    className={'toggle-button ' + props.position}
                />
            </div>
            {props.rightOption}
        </div>
    );
};
