import React from 'react';
import Home from './pages/Home';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Game from './pages/Game';


function App() {
  return (
    <BrowserRouter>
        <Routes >
            <Route path="/">
                  <Route index element={<Home/>} />
                  <Route path="/game" element={ <Game />}/>
                  <Route path="*" element={<Home />} />
            </Route>
        </Routes>
    </BrowserRouter>
    
        
  );
}

export default App;