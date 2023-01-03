import React, { useEffect } from "react";
import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Data from '../storage/Data.js';
import { Link } from "react-router-dom";
import {FaUserCircle} from "react-icons/fa";
import {AiOutlineLogout} from "react-icons/ai";

function Game(){
    var clicks=0;
    var numAutoClickers=1;
    const autoClickerBaseCost=5;
    var userId=1;
    const dlogedUser=Data.getData('logedUser');
    
    const usersAll=Data.getData('allUsers');
    if(usersAll===null){
        usersAll=JSON.stringify({'name':dlogedUser, 'points':0, 'autoclickers':0});
    }
    const findUSer= () => usersAll.filter((us)=> {
        if(us.name===Data.getData('logedUser')){
            userId=us.id;
            clicks=us.points;
            numAutoClickers=us.autoClickers;
            return us;
        }
    });
    const user = findUSer();
    const [uPoints, setuPoints ]=useState(clicks);
    const topranking= usersAll?.sort((a, b) => b.points - a.points);  
    const navigate = useNavigate();
    
    // 1 autoclicker = 1p/100ms
    var autoClickerCost = autoClickerBaseCost + autoClickerBaseCost * numAutoClickers;
    const [canBuy, setCanBuy ]=useState(false);
    const [autoclik, setAutoclick ]=useState(numAutoClickers);
    const [autoclikPrice, setAutoclickPrice ]=useState(autoClickerCost);    
    var setIntervalAuto;
    var intervalAutoTime = 1000 / (autoclik || 1);
    var btnclickerText = "buy autoclicker: " + autoclikPrice;

    const updateAllUsers = usersAll?.map((usUpdate) => {
		if (usUpdate.name === dlogedUser) {
            Data.setData('userPoints', uPoints);
            Data.setData('userAutoclikers', autoclik);
            Data.setData('autoClickerCost', autoClickerCost);
			return { ...usUpdate, points: uPoints, autoClickers: autoclik };
		}
		return usUpdate;
	});
	Data.setData('allUsers', updateAllUsers);

    const updatePoints = () => {
        setuPoints( (uPoints) => {
            return uPoints + 1;
        });
    }

    const updatePointsAutomatic = () => {
        setIntervalAuto = setInterval(updatePoints, intervalAutoTime);
    }

    const addClick = () => {
        updatePoints();
        document.getElementById("totalPoints").innerHTML=uPoints;
    }

    const addAutoClick = () => {
        if(canBuy){
            setAutoclick( (numAutoClickers) => {
                return numAutoClickers +1;
            });

            document.getElementById("totalPoints").innerHTML=uPoints;
            setuPoints( (clicks) => {
                return clicks - autoClickerCost;
            });

            document.getElementById("totalAutoclickers").innerHTML=autoclik;
            updatePointsAutomatic();
        }
    }

    const showNumberUnits = (numberPoints) => {
        const stringNumber = numberPoints.toString();
        var numberUnits;
        
        if(stringNumber.length<3)
            numberUnits='0 k';
        if(stringNumber.length>3)
            numberUnits=stringNumber.slice(0,1) + 'k';
        if(stringNumber.length>4)
            numberUnits=stringNumber.slice(0,2) + 'k';
        if(stringNumber.length>5)
            numberUnits=stringNumber.slice(0,3) + 'k';
        if(stringNumber.length>6)
            numberUnits=stringNumber.slice(0,1) + 'm';

        if(stringNumber.length>7)
            numberUnits=stringNumber.slice(0,2) + 'm';
        
        if(stringNumber.length>8)
            numberUnits=stringNumber.slice(0,3) + 'm';

        return numberUnits;
    }

    const logOutClick=() =>{
        Data.setData('logedUser', "-");
        Data.deleteData('userPoints');
        Data.deleteData('userAutoclikers');
        Data.deleteData('autoClickerCost');
        navigate('/');
    }

    const checkClicks= () => {
        if(autoClickerCost>=uPoints){
            setCanBuy(false);
            document.getElementById("buyAutocliker").disabled=true;
        }else{
            setCanBuy(true);
            document.getElementById("buyAutocliker").disabled=false;
        }
    }

    useEffect( () => {
        checkClicks();
        document.getElementById("buyAutocliker").value='buy autocliker: ' + autoClickerCost;

    }, [autoClickerCost,uPoints]);

    return(
        <main>
            <section className="game-header" id={user.name}>
                <div id="logedUser">
                   <FaUserCircle ></FaUserCircle>
                    <span data-testid="game-logeduser" id={userId}>{ dlogedUser }</span>
                </div>
                    <div id="logOut">
                    <AiOutlineLogout></AiOutlineLogout>
                        <Link to="/" className="logout" onClick={logOutClick} data-testid="game-logout">LogOut</Link>
                    </div>
                
            </section>
            <section className="game-body">
                <div className="homebox">
                    <h2 data-testid="game-clickergame">Clicker game</h2>
                    <div className="pointsbox">
                        <div >
                            <h4 data-testid="game-points-title">POINTS </h4>
                            <p id="totalPoints" data-testid="game-points">{uPoints}</p>
                            <p id="totalPointsUnits" data-testid="game-points-units">{showNumberUnits(uPoints)}</p>
                        </div>
                        <div > 
                        <h4 data-testid="game-autoclickers-title">AUTOCLICKERS </h4>
                            <p id="totalAutoclickers" data-testid="game-autoclickers">
                                {autoclik}
                            </p>
                            <p id="totalAutoclickUnits" data-testid="game-autoclickers-units">{showNumberUnits(autoclik)}</p>
 
                        </div>
                    </div>
                    <input type="button" value="Click" className="btnClick" onClick={addClick} data-testid="game-btnclick"></input>
                    <input type="button" id="buyAutocliker" value={btnclickerText} className="btnAutocliker" onClick={addAutoClick} data-testid="game-btnautoclicker"></input>
                </div>  

                <table className="rank-table" >
                    <thead id="rank-header" className="top-rank-table">
                        <tr >
                            <th data-testid="game-rank-id">RANK</th>
                            <th data-testid="game-rank-name">NAME</th>
                            <th data-testid="game-rank-points">POINTS</th>
                            <th data-testid="game-rank-autoclikers">AUTOCLICKERS</th>
                        </tr>
                    </thead>

                    <tbody id="rank-body">

                        {topranking?.map(({name, autoClickers, megaClickers, points},userid)=>{
                            if(name===dlogedUser){
                                return(
                                    <tr className="active-user-row" key={userid+1}>
                                        <td >{userid+1}</td>
                                        <td >{name}</td>
                                        <td >{points}</td>
                                        <td >{autoClickers}</td>
                                    </tr>
                                );
                            }else{
                                return(
                                    <tr className="user-row" key={userid+1}>
                                        <td >{userid+1}</td>
                                        <td >{name}</td>
                                        <td >{points}</td>
                                        <td >{autoClickers}</td>
                                    </tr>
                                );
                            }
                            
                        })}
                    </tbody>
                </table>

            </section>
        </main>
        
        
    );
};

export default Game;

