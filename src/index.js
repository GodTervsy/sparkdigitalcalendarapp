import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCAtGI1o8u7fcQw0MKGv913-OwdxJnSb2E",
    authDomain: "sparkreleasecalendar.firebaseapp.com",
    databaseURL: "https://sparkreleasecalendar.firebaseio.com",
    projectId: "sparkreleasecalendar",
    storageBucket: "sparkreleasecalendar.appspot.com",
    messagingSenderId: "996151208215"
  };
  firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
