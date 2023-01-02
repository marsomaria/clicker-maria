import React, { useEffect } from "react";
import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Data from '../storage/Data.js';
import { Link } from "react-router-dom";

function Game(){
    var clicks=0;
    const usersAll=Data.getData('allUsers');
    const dlogedUser=Data.getData('logedUser');
    
    const findUSer= () => usersAll.filter((us)=> {
        if(us.name===Data.getData('logedUser')){
            userId=us.id;
            clicks=us.points;
            // console.log(us.points);
            return us;
        }
    });
    const user = findUSer();
    const [uPoints, setuPoints ]=useState(clicks);
    const topranking= usersAll?.sort((a, b) => b.points - a.points);
    const [ranking, setRanking ]=useState([topranking]);
    // console.log(topranking);
    var userpoints=user.points;
    // console.log(userpoints);
    
    const navigate = useNavigate();
    var userId=1;


    const updateAllUsers = usersAll?.map((usUpdate) => {
		if (usUpdate.name === dlogedUser) {
            Data.setData('userPoints', uPoints);
            // console.log(uPoints);
			return { ...usUpdate, points: uPoints };
		}
		return usUpdate;
	});
	Data.setData('allUsers', updateAllUsers);

    const addClick = () => {
        setuPoints( (clicks) => {
            return clicks +1;
        });
        
        document.getElementById("totalPoints").innerHTML=uPoints;
    }

    const logOutClick=() =>{
        console.log('++sesion cerrada++');
        Data.setData('logedUser', "-");
        Data.deleteData('userPoints');
        navigate('/');
    }

    useEffect( () => {
        // console.log(".......s");
    });

    return(
        <main>
            <div className="game-header">
                <div id="logedUser">
                    Hi  
                    {/* {Data.getData('logedUser')} */}
                    {dlogedUser}
                </div>
                    <div id="logOut">
                        <Link to="/" className="logout" onClick={logOutClick}>LogOut</Link>
                    </div>
                
            </div>
            <div className="homebox">
                <h2>Clicker game</h2>
                <div >TOTAL POINTS: 
                    <p id="totalPoints">{uPoints}</p>
                </div>
                <div > 
                    <p id="totalAutoclickers">TOTAL Autoclikers:
                         {/* {Data.getData('userAutoclikers')} */}
                    </p>
                </div>
                <div>
                    <p id="totalMegaclickers">TOTAL Megaclikers: 
                        {/* {Data.getData('userMegaclickers')} */}
                    </p>
                </div>
                <input type="button" value="Click" className="btnClick" onClick={addClick}></input>
                
            </div>  
            <div className="latestRanking">
                {/* <p><b>TOP Ranking</b></p>
                <p>NAME: Points</p> */}

                <table className="rank-table">
                    <thead className="top-rank-table">
                        <tr >
                            <th>Rank</th>
                            <th>NaME</th>
                            <th>POINTS</th>
                            <th>autoclickers</th>
                            <th>megaclickers</th>

                        </tr>
                    </thead>

                    <tbody>

                        {   
                            topranking?.map(({name, autoClickers, megaClickers, points},userid)=>{
                                
                            if(name===dlogedUser){
                                return(<tr className="active-user-row">
                                    <td>{userid+1}</td>
                                    <td>{name}</td>
                                    <td>{points}</td>
                                    <td>{autoClickers}</td>
                                    <td>{megaClickers}</td>



                                </tr>);
                            }else{
                                return(
                                    <tr className="user-row">
                                        <td>{userid+1}</td>
                                        <td>{name}</td>
                                        <td>{points}</td>
                                        <td>{autoClickers}</td>
                                        <td>{megaClickers}</td>
                                    </tr>
                                    // <p className="topRanking">{name}: {points}</p>
                                
                                );
                            }
                            
                        })}
                    </tbody>
                </table>
                {/* {topranking?.map(({name, autoclickers, megaclickers, points},userid)=>{
                    return(<p className="topRanking">{name}: {points}</p>);
                    console.log(name);
                })} */}
            </div>
        </main>
        
        
    );
};

export default Game;

