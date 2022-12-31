import React, { useEffect } from "react";
import { useRef, useState } from 'react';
import Home from "./Home.js";
import { Link, Router, useNavigate, Route, Navigate } from 'react-router-dom';
import Data from '../storage/Data.js';
import { EventHandler } from "react";
import ClickGame from "../component/ClickGame.js";
import NavBar from "../component/NavBar.js";

function Game(){
    const getRanking=Data.getData('allUsers');
    const topranking= getRanking?.sort((a, b) => b.points - a.points);
    const [ranking, setRanking ]=useState([]);
    // setRanking(getRanking);
    console.log(getRanking);
    console.log(topranking);

    const addClick = () => {
        let clicks=parseInt(localStorage.getItem('userPoints'));
        clicks=clicks+1;
        localStorage.setItem('userPoints', clicks);
        document.getElementById("totalPoints").innerHTML=clicks;
    }

    const logOutClick=() =>{
        console.log('++sesion cerrada++');
        localStorage.removeItem('logedUser');
        Navigate('/');
    }

    useEffect( () => {
        console.log(".......s");
    });

    return(
        // <><NavBar /><ClickGame /></>
        
        <main>
            {/* <Router> */}
            <div className="game-header">
                <div id="logedUser">
                    Hi
                    <p>{localStorage.getItem('logedUser')}</p>
                </div>
                {/* <Route exact path="/"> */}
                    {/* <Home /> */}
                    {/* <Link to="/home"></Link> */}
                    <div id="logOut">
                        {/* <Link to="/" onClick={logOutClick}>LogOut</Link>*/ }
                        <a href="/" >LogOut</a>
                    </div>
                {/* </Route> */}
                
            </div>
            {/* </Router> */}
            <div className="homebox">
                <h2>Clicker game</h2>
                <div >TOTAL POINTS: 
                    <p id="totalPoints">{localStorage.getItem('userPoints')}</p>
                </div>
                <div > 
                    <p id="totalAutoclickers">TOTAL Autoclikers: {localStorage.getItem('userAutoclikers')}</p>
                </div>
                <div><p id="totalMegaclickers">TOTAL Megaclikers: {localStorage.getItem('userMegaclickers')}</p></div>
                <input type="button" value="Click" className="btnClick" onClick={addClick}></input>
                
            </div>  
            <div className="latestRanking">
                <p><b>TOP Ranking</b></p>
                <p>NAME: Points</p>
                {topranking?.map(({name, autoclickers, megaclickers, points},userid)=>{
                    // return(<p className="topRanking">{name}: {points}</p>);
                    // console.log(name);
                })}
            </div>
        </main>
        
        
    );
};

export default Game;

