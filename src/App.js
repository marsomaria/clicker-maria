// import logo from './logo.svg';
// import './App.css';
// import Home from './pages/Home.js';
// import { BrowserRouter } from 'react-router-dom';

// function App() {
//   // return (
//   //   // <Home></Home>
    
//   // );
// }

// export default App;


import React from 'react';
import Home from './pages/Home';
import {BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Game from './pages/Game';
// import { AnimatePresence } from 'framer-motion';

function App() {
  // const location =useLocation();
  return (
    <BrowserRouter>
      {/* <AnimatePresence exitBeforeEnter> */}
        <Routes >
            <Route path="/">

                  <Route index element={<Home/>} />

                  <Route path="/game" element={ <Game />}/>

            </Route>
        </Routes>
    {/* </AnimatePresence> */}
    </BrowserRouter>
    
        
  );
}

export default App;