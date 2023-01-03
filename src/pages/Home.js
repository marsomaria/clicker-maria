import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Data from '../storage/Data.js';

function Home(){
    const navigate = useNavigate();
    const [valuename, setValueName] = useState('');
    const [theName, setTheName] = useState(false);
    // const [start, setStart]=useState(false);

    const logedUser={
        name:valuename,
        points:0,
        autoClickers:0        
    };
    const allUsersEmpty = [];

    const SubmitHandler =  async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(formData);

        if(valuename!==''){
            Data.setData('logedUser', logedUser.name);
            const allUsers = Data.getData('allUsers');
            
            if(allUsers===null){
                Data.setData('allUsers', [...allUsersEmpty, logedUser]);
                navigate('/game');
            }else{
                const findUSer=allUsers.filter((us)=> us.name===valuename);
                if(!findUSer.length){
                    Data.setData('allUsers', [...allUsers, logedUser]);
                    navigate('/game');
                }else{
                    console.log('+++ya existe++');
                    navigate('/game');
                }
            }
        }else{
            document.getElementById("errorName").innerHTML="Name is required to login ";
            document.getElementById("inputName").style="border:1px solid red; /*background-color:#e2b8b8;*/";
        }
    };

    const checkName = (inputtext) => {
        setValueName(inputtext.target.value);
        let text=inputtext.target.value;
        console.log(text);
        if(text===''){
            setTheName(true);
        }else{
            setTheName(false);
        }
    }

    return(
        <div className="box">
            <h2 data-testid="clicker-game-h2">Clicker game</h2>
            <p data-testid="sign-name">sign in with a name</p>
            <p id="errorName"></p>
            <form onSubmit={SubmitHandler}>
                <input data-testid="input-name" type="text" id="inputName" name="name" placeholder="name" onChange={checkName} className='inputNAME'></input>
                <input data-test-id="join-button" type="submit" value="START" className='btnJOIN'></input>
            </form>
        </div>
    );
};

export default Home;