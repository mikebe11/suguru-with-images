import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import App from './app';


// Must require the scss file here so the webpack loader can process it.
require('../scss/index.scss');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('mobile-app')
);
