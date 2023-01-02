import React, { useEffect } from "react";
import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Data from '../storage/Data.js';
import { Link } from "react-router-dom";
import {FaUserCircle} from "react-icons/fa";
import Pagination from 'react-paginate';
import RiLogoutCircleRLine from "react-icons/ri";
import AiOutlineLogout from "react-icons/ai";
import IoMdLogOut from "react-icons/io";

function Game(){
    var clicks=0;
    var numAutoClickers=1;
    const autoClickerBaseCost=5;
    
    const usersAll=Data.getData('allUsers');
    const dlogedUser=Data.getData('logedUser');
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
    const [ranking, setRanking ]=useState([topranking]);

    // const [currentPage, setCurrentPage] = useState(1);
    // const [recordsPerPage] = useState(10);
    // const indexOfLastRecord = currentPage * recordsPerPage;
    // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // const currentRecords = usersAll.slice(indexOfFirstRecord, 
    //     indexOfLastRecord);
    //     console.log(currentRecords);
    //     const nPages = Math.ceil(usersAll.length / recordsPerPage);
    //     const pageNumbers = [...Array(nPages + 1).keys()].slice(1)


    //     const nextPage = () => {
    //         if(currentPage !== nPages) 
    //             setCurrentPage(currentPage + 1)
    //     }
    //     const prevPage = () => {
    //         if(currentPage !== 1) 
    //             setCurrentPage(currentPage - 1)
    //     }




    var userpoints=user.points;    
    const navigate = useNavigate();
    var userId=1;

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

    // const handlePageRanking = (actualPage) =>{
    //     setCurrentPage(actualPage.selected + 1); // update the current page in state
    // }

    const logOutClick=() =>{
        console.log('++sesion cerrada++');
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
            <section className="game-header">
                <div id="logedUser">
                   <FaUserCircle ></FaUserCircle>
                   {/* <IoMdLogOut></IoMdLogOut> */}
                    {/* {Data.getData('logedUser')} */}
                    <span>{ dlogedUser }</span>
                </div>
                    <div id="logOut">
                    {/* <RiLogoutCircleRLine></RiLogoutCircleRLine> */}
                    {/* <AiOutlineLogout></AiOutlineLogout> */}
                        <Link to="/" className="logout" onClick={logOutClick}>LogOut</Link>
                    </div>
                
            </section>
            <section className="game-body">
                <div className="homebox">
                    <h2>Clicker game</h2>
                    <div className="pointsbox">
                        <div >
                            TOTAL POINTS: 
                            <p id="totalPoints">{uPoints}</p>
                            <p id="totalPointsUnits">{showNumberUnits(uPoints)}</p>
                        </div>
                        <div > TOTAL AUTCLIKERS:
                            <p id="totalAutoclickers">
                                {autoclik}
                            </p>
                            <p id="totalAutoclickUnits">{showNumberUnits(autoclik)}</p>

                        </div>
                    </div>
                    <input type="button" value="Click" className="btnClick" onClick={addClick}></input>
                    <input type="button" id="buyAutocliker" value={btnclickerText} className="btnAutocliker" onClick={addAutoClick}></input>
                </div>  

                <div className="latestRanking">
                    <table className="rank-table" >
                        <thead id="rank-header" className="top-rank-table">
                            <tr >
                                <th>RANK</th>
                                <th>NAME</th>
                                <th>POINTS</th>
                                <th>AUTOCLICKERS</th>
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
                                        // <p className="topRanking">{name}: {points}</p>
                                    );
                                }
                                
                            })}
                        </tbody>
                    </table>
                    {/* <Pagination
        nPages = { nPages }
        currentPage = { currentPage } 
        setCurrentPage = { setCurrentPage }
    /> */}
                </div>
            </section>
        </main>
        
        
    );
};

export default Game;

