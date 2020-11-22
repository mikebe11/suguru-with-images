import React from 'react';
import { connect } from 'react-redux';
import { changeMobileAction } from '../redux/actionCreators';


function Controls(props) {
    let selected = 'piece selected';

    return (
        <div id="controls">
            {props.pieces.map((imageFile, index) => (
                <div key={'picker' + index}>
                    <span>{index + 1}.</span>
                    <img
                        src={`./images/${imageFile}`}
                        className={props.imageAction === (imageFile) ? selected : 'piece'}
                        alt=""
                        onTouchStart={() => { props.changeMobileAction(imageFile) }}
                    />
                </div>
            ))}
            <div id="trash">
                <img
                    src={'./images/wastebasket.png'}
                    className={props.imageAction === false ? selected : 'piece'}
                    alt=""
                    onTouchStart={() => { props.changeMobileAction(false) }}
                />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    pieces: state.pieces,
    showVerifiedImage: state.showVerifiedImage,
    imageAction: state.imageAction
});

const mapDispatchToProps = {
    changeMobileAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
