import './App.css';
import { useNavigate } from "react-router-dom";
import React, {useState, useEffect} from "react";
import {db, auth} from "./config/firebase";
import {collection, getDocs, query, orderBy, where, doc} from "firebase/firestore";

function Leaderboard(){
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [leaderboardData, setLeaderboardData] = useState([]);

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

    useEffect(() => {
        if(userLoggedIn){
            getLeaderboardDataForTime("10");
        }
    }, [userLoggedIn]);

    if(loading){
        return <p>Loading...</p>
    }

    async function getLeaderboardDataForTime(time){
        setLeaderboardData([]);
        const leaderboardRef = collection(db, "leaderboard");
        try{
            const q = query(leaderboardRef, where("seconds", "==", time), orderBy("wpm", "desc"));
            const querySnap = await getDocs(q);

            const data = querySnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setLeaderboardData(data);
        }catch(err){
            console.log(err);
        }
    }

    return(
        <>
            {userLoggedIn ? (
                <>
                <div className="leaderboardButtons">
                <button onClick={() => getLeaderboardDataForTime("10")}>10s</button>
                <button onClick={() => getLeaderboardDataForTime("15")}>15s</button>
                <button onClick={() => getLeaderboardDataForTime("30")}>30s</button>
                <button onClick={() => getLeaderboardDataForTime("60")}>60s</button>
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
                        {leaderboardData.map(user => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.wpm}</td>
                                <td>{user.lastUpdated?.toDate ? user.lastUpdated.toDate().toLocaleString() : ""}</td>
                            </tr>
                        ))}
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