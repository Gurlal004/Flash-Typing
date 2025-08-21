import { LoginButton, SignUpButton } from "./LoginSignUp";
import flashLogo from '../assets/flashLogo.png';

function NavBar(){

    return(
        <>
        <div className="navbar">
            <img src={flashLogo} alt="" />
            <nav>
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">Type</a></li>
                    <li><a href="">Leader Board</a></li>
                </ul>
            </nav>
            <div>
                <LoginButton></LoginButton>
                <SignUpButton></SignUpButton>
            </div>
        </div>
        </>
    )
}

export default NavBar;