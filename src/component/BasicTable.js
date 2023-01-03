import React, { useEffect } from "react";
import Data from '../storage/Data.js';
import {useTable, usePagination} from "react-table";

function BasicTable(){
    const postsPerPage= 5;
    const currentPage= 1;
    const usersAll=Data.getData('allUsers');
    const dlogedUser=Data.getData('logedUser');
    const [state, setState]=useEffect('1');
    const findUSer= () => usersAll.filter((us)=> {
        if(us.name===Data.getData('logedUser')){
        
            return us;
        }
    });
    const user = findUSer();
    
    const topranking= usersAll?.sort((a, b) => b.points - a.points);

    const showPagination = () => {
        
        const pageNumbers = [];
        const totalPosts = usersAll.length;
   
        for(let i = 1; i<=Math.ceil(totalPosts/postsPerPage); i++){
          pageNumbers.push(i)
        }
   
        const pagination = (pageNumbers) => {
          setState({currentPage: pageNumbers});
        }
   
        return(
          <nav>
          <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className={currentPage === number ? 'page-item active' : 'page-item' }>
            <button onClick={()=> pagination(number)} className="page-link"> {number} </button>
            </li>
          ))}
          </ul>
          </nav>
        )
      }

    return(
        <div>
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

                
            {showPagination()}
            </div>
        
        
    );
};

export default BasicTable;

