import React from "react";
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Data from '../storage/Data.js';
import { EventHandler } from "react";
// import styled from "styled-components";

function Home(){
    // const uNavigate = useNavigate();
    const useRefForm= useRef('');
    const [valuename, setValueName] = useState('');
    const [theName, setTheName] = useState(false);
    const [start, setStart]=useState(false);

    const SubmitHandler =  async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(formData);


        if(valuename!==''){
            const logedUser={
                name:valuename,
                autoClickers:0,
                points:0
            };
            const allUsers = Data.getData('allUsers');
            Data.setData('logedUser', logedUser.name);

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
            <p>Clicker game</p>
            <p>sign in with a name</p>
            <form onSubmit={SubmitHandler}>
                <input type="text" name="name" placeholder="name" onChange={checkName}></input>
                <input type="submit" value="START"></input>
                {/* <Link to={'/game/' }></Link></input> */}
            </form>
        </div>
    );
}
// const homebox = styled.div`

// max-width: 500px;
// min-width: 300px;
// max-height: 700px;
// width: 30%;
// height: 60%;
// margin: 100px auto;
// background-color: #FFFFFF;
// border-radius: 25px;
// `;
export default Home;