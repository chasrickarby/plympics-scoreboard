import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Settings from './settings'
import * as serviceWorker from './serviceWorker';

new Settings();
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// curl -X PUT -d '{  }' 'https://plympics-scoreboard.firebaseio.com/users/jack/name.json'
