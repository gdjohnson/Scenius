import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
const Modal = require('react-modal');

document.addEventListener("DOMContentLoaded", () => {
    const store = configureStore();
    window.getState = store.getState;
    window.dispatch = store.dispatch;

    Modal.setAppElement(document.body);

    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store}>Scenius</Root>, root)
})