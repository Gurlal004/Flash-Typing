import "../App.css";
import React, {useState, useEffect} from "react";
import { auth , db} from "../config/firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {setDoc, doc} from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignUp({onClose}){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(() => {
            return localStorage.getItem("darkMode") === "true";
        });
    
        useEffect(() => {
            document.body.classList.toggle("dark", darkMode);
            localStorage.setItem("darkMode", darkMode);
        }, [darkMode])

    const signup = async (e) => {
        e.preventDefault();
        try{
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        if(user){   
            await setDoc(doc(db, "users", user.uid), {
                email: email,
                username: username,
            });
        }
        toast.success("User Registered", {
            position: "top-right"
        });
        }catch(err){
            console.error(err);
            toast.success(err.message, {
                position: "bottom-right"
            });
        }
    };

    return(
        <>
        <form className="loginForm" onSubmit={signup}>
            <div className="formRow">
                <label htmlFor="email"><strong>Email</strong></label>
                <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} required></input><br></br>
            </div>

            <div className="formRow">
                <label htmlFor="username"><strong>Username</strong></label>
                <input id="username" type="text" onChange={(e) => setUsername(e.target.value)} required></input><br></br>
            </div>

            <div className="formRow">
                <label htmlFor="password"><strong>Password</strong></label>
                <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} required></input><br></br>
            </div>

            <div className="formRow">
                <label htmlFor="confirmPass"><strong>Confirm Password</strong></label>
                <input id="confirmPass" type="password" onChange={(e) => setConfPassword(e.target.value)} required></input><br></br>
            </div>

            <div className="formButtons">
                <button type="submit">SignUp</button>
                <button type="button" onClick={ () => navigate("/")}>Close</button>
            </div>
        </form>
        </>
    )
}

export default SignUp;