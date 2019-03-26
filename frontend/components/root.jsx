import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import Application from './application';

export default ({store}) => {
    return (
        <Provider store={store}>
            <HashRouter>
                {/* <Application /> */}
                <h1>Test</h1>
            </HashRouter>
        </Provider>
    );
}