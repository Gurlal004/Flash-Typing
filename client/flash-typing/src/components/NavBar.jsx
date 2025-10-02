import "../App.css";
import { LoginButton, SignUpButton } from "./LoginSignUp";
import flashLogo from '../assets/flashLogo.png';
import sunIcon from '../assets/sunIcon.png';
import moonIcon from '../assets/moonIcon.png';
import { Link} from "react-router-dom";
import {auth, db} from "../config/firebase";
import {getDoc, doc} from "firebase/firestore";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


// function NavBar({ onLoginClick, onSignUpClick, onHomeClick, onTypingClick, onLeaderboardClick }){

//     return(
//         <>
//         <div className="navbar">
//             <img src={flashLogo} alt="" />
//             <nav>
//                 <ul>
//                     <li><a onClick={onHomeClick}>Home</a></li>
//                     <li><a onClick={onTypingClick}>Typing</a></li>
//                     <li><a onClick={onLeaderboardClick}>Leaderboard</a></li>
//                 </ul>
//             </nav>
//             <div>
//                 <LoginButton onClick={onLoginClick}></LoginButton>
//                 <SignUpButton onClick={onSignUpClick}></SignUpButton>
//             </div>
//         </div>
//         </>
//     )
// }

function NavBar({darkMode, darkModeToggler}) {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = auth.onAuthStateChanged(async (user) => {
                if(user){
                    const userRef = doc(db, "users", user.uid);
                    const userSnap = await getDoc(userRef);
                    if(userSnap.exists()){
                         setUserDetails(userSnap.data());
                    }else{
                        setUserDetails({username: "User"});
                    }
                    setUserLoggedIn(true);
                }else{
                    setUserDetails(null);
                    setUserLoggedIn(false);
                }
                setLoading(false);
        }); 
        return () => getUser();
    }, []);

    async function logout(){
        try{
            await auth.signOut();
            setUserLoggedIn(false);
            setUserDetails(null);
            navigate("/");
        }catch(err){

        }
    }

    return (
        <div className="navbar">
            <img src={flashLogo} alt="Flash Logo" />
            <nav>
                <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/typing">Typing</Link></li>
                <li><Link to="/leaderboard">Leaderboard</Link></li>
                </ul>
            </nav>
            <div className="buttonsLogin">
                {loading ? null : userLoggedIn ? (
                    <>
                    <h3 style={{color:"green"}}>Logged in as {userDetails?.username || "User"}</h3>
                    <button onClick={logout}>Logout</button>
                    </>

                ) : (
                    <>           
                    <Link to="/login"><button>Login</button></Link>
                    <Link to="/signup"><button>Sign Up</button></Link>
                    </>
                )}
                <button className="darkModeBtn" onClick={darkModeToggler}>
                    <img src={darkMode ? sunIcon : moonIcon}/>
                </button>
            </div>
        </div>
    );
}

export default NavBar;