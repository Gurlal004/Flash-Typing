import Login from "./Login";
import SignUp from "./Signup";
import React, {useState} from "react";

export function LoginButton({onClick}){
    const [showLogin, setShowLogin] = useState(false);
    return (
        <>
            <button onClick={onClick}>Login</button>
            {showLogin && <Login onClose={() => setShowLogin(false)}/>}
        </>
    )
}

export function SignUpButton({onClick}){
    const [showSignUp, setShowSignUp] = useState(false);
   return(
    <>
        <button onClick={onClick}>SignUp</button>
        {showSignUp && <SignUp onClose={() => setShowSignUp(false)}/>}
    </>
   )
}
