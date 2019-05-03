import 'react-app-polyfill/ie11';
import 'core-js/features/array/includes';
import 'core-js/features/string/repeat';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import App from './containers/App/App';
import ErrorBoundary from './containers/ErrorBoundary/ErrorBoundary';
import * as serviceWorker from './serviceWorker';

import './index.css';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
