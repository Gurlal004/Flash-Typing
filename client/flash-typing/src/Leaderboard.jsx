import './App.css';
import { useNavigate } from "react-router-dom";
import React, {useState, useEffect} from "react";
import {auth} from "./config/firebase";
import {collection, getDocs, query, orderBy, where} from "firebase/firestore";

function Leaderboard(){
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = auth.onAuthStateChanged(async (user) => {
                if(user){
                    setUserDetails(user);
                    setUserLoggedIn(true);
                }else{
                    setUserDetails(null);
                    setUserLoggedIn(false);
                }
                setLoading(false);
        }); 
        return () => getUser();
    }, []);

    if(loading){
        return <p>Loading...</p>
    }

    return(
        <>
            {userLoggedIn ? (
                <>
                <div className="leaderboardButtons">
                <button>10s</button>
                <button>15s</button>
                <button>30s</button>
                <button>60s</button>
            </div>
            <div className="centerLeaderboard">
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>WPM</th>
                            <th>Last Login</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </>
            ): (
                <>
                    <div className="h1Center">
                         <h1>Please login to view Leaderboard</h1>
                    </div>
                </>
            )}
        </>
    )
}

export default Leaderboard;