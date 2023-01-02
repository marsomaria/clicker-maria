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
    const usersAll=Data.getData('allUsers');
    const dlogedUser=Data.getData('logedUser');
    const findUSer= () => usersAll.filter((us)=> {
        if(us.name===Data.getData('logedUser')){
            userId=us.id;
            return us;
        }
    });
    // console.log(getRanking);
    // console.log(topranking);
    const user = findUSer();
    const topranking= getRanking?.sort((a, b) => b.points - a.points);
    const [ranking, setRanking ]=useState([]);
    const [uPoints, setPoints ]=useState(user?.points);
    const navigate = useNavigate();

    // setRanking(getRanking);

    const allUsers = Data.getData('allUsers');
    var clicks=0;
    var userId=0;

    

    // const updateAllUsers = () => {
    //     user[0].points=clicks;
    //     console.log(user);
    //     allUsers[userId].points=clicks;


    // }

    const updateAllUsers = usersAll?.map((usUpdate) => {
		if (usUpdate.name === dlogedUser) {
			return { ...usUpdate, autoClickers: 0, points: uPoints };
		}
		return usUpdate;
	});

	Data.setData('allUsers', updateAllUsers);

    const addClick = () => {
        clicks=parseInt(Data.getData('userPoints'));
        clicks=clicks+1;
        Data.setData('userPoints', clicks);
        setPoints(clicks);
        user.points=uPoints;
        document.getElementById("totalPoints").innerHTML=clicks;
    }

    const logOutClick=() =>{
        console.log('++sesion cerrada++');
        Data.deleteData('logedUser');
        // updateAllUsers();
        navigate('/');
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
                    {Data.getData('logedUser')}
                </div>
                {/* <Route exact path="/"> */}
                    {/* <Home /> */}
                    {/* <Link to="/home"></Link> */}
                    <div id="logOut">
                        {/* <Link to="/" onClick={logOutClick}>LogOut</Link>*/ }
                        <a href="/" >LogOut</a>
                        <input type="button" value="LogOut" className="btnLogout" onClick={logOutClick}></input>

                    </div>
                {/* </Route> */}
                
            </div>
            {/* </Router> */}
            <div className="homebox">
                <h2>Clicker game</h2>
                <div >TOTAL POINTS: 
                    <p id="totalPoints">{Data.getData('userPoints')}</p>
                </div>
                <div > 
                    <p id="totalAutoclickers">TOTAL Autoclikers: {Data.getData('userAutoclikers')}</p>
                </div>
                <div><p id="totalMegaclickers">TOTAL Megaclikers: {Data.getData('userMegaclickers')}</p></div>
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

