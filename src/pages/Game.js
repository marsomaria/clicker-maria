import React, { useEffect } from "react";
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

    const logOutClick=() =>{
        console.log('++sesion cerrada++')
    }

    useEffect( () => {
        
    });

    return(
        // <><NavBar /><ClickGame /></>
        <main>
            <div className="game-header">
                <div id="logedUser">Hi</div>
                <div id="logOut">
                    <Link to="/" onClick={logOutClick}>LogOut</Link>
                </div>
            </div>
            <div className="homebox">
                <p>Clicker game</p>
                
            </div>  
            <div className="latestRanking">
                <p><b>TOP Ranking</b></p>
                <p>NAME: Points</p>
                {topranking?.map(({name, autoclickers, megaclickers, points},userid)=>{
                    return(<p className="topRanking">{name}: {points}</p>);
                    console.log(name);
                })}
            </div>
        </main>
        
    );
};

export default Game;

