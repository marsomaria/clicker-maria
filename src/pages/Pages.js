import React from 'react';
import Home from './Home';
import {Route, Routes, useLocation } from "react-router-dom";
import Game from './Game';
import { AnimatePresence } from 'framer-motion';

function Pages() {
  const location =useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />}/>
            <Route path="/game" element={<Game />}/>
        </Routes>
    </AnimatePresence>
        
  );
}

export default Pages;