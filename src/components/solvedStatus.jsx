import React from 'react';
import { connect } from 'react-redux';
import { unsetVerifiedImage } from '../redux/actionCreators';


class SolvedStatus extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        if (this.props.showVerifiedImage === false) {
            setTimeout(() => {
                this.props.unsetVerifiedImage();
            }, 4500);
        }
    }

    render() {
        let classes = this.props.disabled ? 'button disabled' : 'button';

        let innerHTML = "check solution";

        if (this.props.showVerifiedImage === true) {
            innerHTML = <img src={'./images/2714.png'} alt="" />;
            classes += ' with-image';
        } else if (this.props.showVerifiedImage === false) {
            innerHTML = <img src={'./images/274c.png'} alt="" />;
            classes += ' with-image';
        }

        return (
            <div
                id="solved-status"
                className={classes}
                onClick={this.props.click}
            >
                {innerHTML}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    showVerifiedImage: state.showVerifiedImage
});

const mapDispatchToProps = {
    unsetVerifiedImage
};

export default connect(mapStateToProps, mapDispatchToProps)(SolvedStatus);
