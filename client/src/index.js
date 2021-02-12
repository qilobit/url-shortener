import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.bundle';

const firebaseConfig = {
  apiKey: "AIzaSyCLexJQc8mPlNqgWiKrAV2BdyWvjd_QWSs",
  authDomain: "pagueporver.firebaseapp.com",
  projectId: "pagueporver",
  storageBucket: "pagueporver.appspot.com",
  messagingSenderId: "911617664176",
  appId: "1:911617664176:web:19db6df41a2167154a8775",
  measurementId: "G-4C49LJRL70"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
