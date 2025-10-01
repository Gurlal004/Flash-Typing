import "../App.css";
import { auth , db } from "../config/firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import {setDoc, doc} from "firebase/firestore";
import React, {use, useState} from "react";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

function Login({onClose}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Logged In", {
                position: "top-right"
            });
            navigate("/");    
        }catch(err){

        }
    }

    return(
        <>
        <form className="loginForm" onSubmit={login}>
            <div className="formRow">
                <label htmlFor="email"><strong>Email</strong></label>
                <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} required></input><br></br>
            </div>

            <div className="formRow">
                <label htmlFor="password"><strong>Password</strong></label>
                <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} required></input><br></br>
            </div>

            <div className="formButtons">
                <button type="submit">Login</button>
                <button type="button" onClick={ () => navigate("/")}>Close</button>
            </div>
        </form>
        </>
    )
}

export default Login;