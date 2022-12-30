import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NavBar from './component/NavBar';
import Home from './pages/Home';
import Game from './pages/Game';
// import Pages from './pages/Pages';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, BrowserRouter as Router, Routes} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <Router>
  //     {/* <NavBar/> */}
  //     <Home/>
  //     {/* <Game /> */}
  //   </Router>

   
  // </React.StrictMode>
  // <Pages />

  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
