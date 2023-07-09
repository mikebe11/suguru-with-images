import React, { useState } from 'react';
import DropDown from './dropDown';
import Button from './button';
import { connect } from 'react-redux';
import { changePuzzle, puzzleIsLoading } from '../redux/actionCreators';


function SizeDropDown(props) {
    const [size, setSize] = useState('5x5');

    const [puzzleId, setPuzzleId] = useState(1);

    const value = props.width.toString() + 'x' + props.height.toString();

    let buttonBody = 'load';

    let style = null;

    let options = [];

    for (let x = 1; x <= props.sizes[size]; x++) {
        options.push(x);
    }

    const sizes = Object.keys(props.sizes);

    let clickHandler = () => {
        props.setPuzzleIsLoading();
        let split = size.split('x');

        props.changePuzzle(split[0], split[1], puzzleId);
    };

    function changeSizeHandler(event) {
        setSize(event.target.value);

        setPuzzleId(1);
    }

    if (value === size && props.puzzleIndex === puzzleId) {
        clickHandler = null;
    }

    if (props.puzzleIsLoading) {
        clickHandler = null;
        style = {'lineHeight': 1};
        buttonBody = <img src="./images/loading.gif" alt="" />;
    }

    return (
        <div id="puzzle-picker">
            <div>
                <DropDown
                    options={sizes}
                    value={size}
                    change={changeSizeHandler}
                />
                <DropDown
                    options={options}
                    value={puzzleId}
                    change={(event) => {
                        setPuzzleId(parseInt(event.target.value, 10));
                    }}
                />
            </div>
            <Button
                style={style}
                click={clickHandler}
                disabled={value === size && props.puzzleIndex === puzzleId}
                text={buttonBody}
            />
        </div>
    );
}

const mapStateToProps = (state) => ({
    puzzleIndex: state.puzzleIndex,
    height: state.height,
    width: state.width,
    sizes: state.sizes,
    puzzleIsLoading: state.puzzleIsLoading
});

const mapDispatchToProps = {
    changePuzzle,
    setPuzzleIsLoading: puzzleIsLoading
};

export default connect(mapStateToProps, mapDispatchToProps)(SizeDropDown);
