import React from "react";
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Data from '../storage/Data.js';
import Game from "./Game.js";
import { EventHandler } from "react";
// import styled from "styled-components";

function Home(){
    const navigate = useNavigate();
    const useRefForm= useRef('');
    const [valuename, setValueName] = useState('');
    const [theName, setTheName] = useState(false);
    const [start, setStart]=useState(false);

    const logedUser={
        name:valuename,
        autoClickers:0,
        megaClickers:0,
        points:0
    };
    const allUsersEmpty = [];

    const SubmitHandler =  async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(formData);


        if(valuename!==''){
            Data.setData('logedUser', logedUser.name);
            Data.setValue('userPoints', logedUser.points);
            Data.setData('userAutoclikers', logedUser.autoClickers);
            Data.setData('userMegaclickers', logedUser.megaClickers);

        

            const allUsers = Data.getData('allUsers');
            
            if(allUsers===null){
                Data.setData('allUsers', [...allUsersEmpty, logedUser]);
                
                navigate('/game');
            }else{
                const findUSer=allUsers.filter((us)=> us.name===valuename);
                // console.log(findUSer);
                if(findUSer.length===0){
                    Data.setData('allUsers', [...allUsers, logedUser]);
                    navigate('/game');
                }
                if(findUSer.length===1){
                    console.log('+++ya existe++');
                    navigate('/game');
                }

                // Data.setData('allUsers', [...allUsers, logedUser]);
                // allUsers.findIndex((us)=> us.includes(logedUser.name) );
                // navigate('/game');
            }
        }
    };

    const checkName = (inputtext) => {
        setValueName(inputtext.target.value);
        // console.log(inputtext.target.value);
        let text=inputtext.target.value;
        console.log(text);
        if(text===''){
            setTheName(true);
        }else{
            setTheName(false);
        }
    }



    return(
        <div className="homebox">
            {/* <span class="dot"></span>
            <span class="dot"></span> */}
            <p>Clicker game</p>
            <p>sign in with a name</p>
            <form onSubmit={SubmitHandler}>
                <input type="text" name="name" placeholder="name" onChange={checkName} className='inputNAME'></input>
                <input type="submit" value="START" className='btnJOIN'></input>
                {/* <Link to={'/game/' }></Link></input> */}
            </form>
        </div>
    );
};

export default Home;