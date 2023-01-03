import React from 'react';
import Home from './Home';
import {Route, Routes, useLocation } from "react-router-dom";
import Game from './Game';

function Pages() {
  const location =useLocation();
  return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" component={<Home />}/>
            <Route path="/game" render={ () =><Game />}/>
        </Routes>
        
  );
}

export default Pages;