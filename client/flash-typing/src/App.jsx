import React, {useState, useEffect} from "react";
import NavBar from "./components/NavBar.jsx";
import Typing from "./Typing.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/Signup.jsx";
import Home from "./components/Home.jsx";
import LeaderBoard from "./Leaderboard.jsx";
import { ToastContainer } from "react-toastify";
import {Routes, Route} from "react-router-dom";

function App(){
    const [screen, setScreen] = useState("typing");
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });
    
    useEffect(() => {
        document.body.classList.toggle("dark", darkMode);
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode])

    useEffect(() => {
    }, [screen]);
    return(
        <>
        <NavBar darkMode={darkMode} darkModeToggler={() => setDarkMode(d => !d)}/>
        {/* <NavBar onLoginClick ={() => setScreen("login")}
                onSignUpClick ={() => setScreen("signup")}
                onHomeClick ={() => setScreen("home")}
                onLeaderboardClick={() => setScreen("leaderboard")}
                onTypingClick={() => setScreen("typing")}></NavBar>
        {screen === "login" && <Login onClose={() => setScreen("home")}></Login>}
        {screen === "signup" && <SignUp onClose={() => setScreen("home")}></SignUp>}
        {screen === "home" && <Home></Home>}
        {screen === "leaderboard" && <LeaderBoard></LeaderBoard>}
        {screen === "typing" && <Typing></Typing>} */}
        <ToastContainer/>
        
        <Routes>
            <Route path="/" element={<Home></Home>}/>
            <Route path="/login" element={<Login></Login>}/>
            <Route path="/signup" element={<SignUp></SignUp>}/>
            <Route path="/leaderboard" element={<LeaderBoard></LeaderBoard>}/>
            <Route path="/typing" element={<Typing></Typing>}/>
        </Routes>

        </>
    )
}

export default App;