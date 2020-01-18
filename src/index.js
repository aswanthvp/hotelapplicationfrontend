import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App.js';
import {FoodProvider} from './context'
// import { hashHistory } from'react-router-dom';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <FoodProvider>
        <Router >
            <App />
        </Router>
    </FoodProvider>
,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
