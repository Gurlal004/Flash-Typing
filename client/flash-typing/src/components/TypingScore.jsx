import { useEffect, useRef, useState} from "react";
import Swal from 'sweetalert2';
import {auth, db} from "../config/firebase";
import {getDoc, doc, setDoc, updateDoc, serverTimestamp} from "firebase/firestore";

function TypingScore({input, words, userInputs, currIndex, time, visible }) {
    if(!visible) return null;

    const [showResult, setShowResults] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

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
        }); 
        return () => getUser();
    }, []);

    let correctChars = 0;
    let incorrectChars = 0;

    for(let i = 0; i < currIndex; i++) {
        const expected = words[i] || "";
        const actual = userInputs[i] || "";
        for(let j = 0; j < expected.length; j++) {
            if(actual[j] === expected[j]) correctChars++;
                else incorrectChars += 1;
        }
    }

    const minutes = time / 60;
    const wpm = minutes > 0 ? Math.round( ((correctChars / 5) - incorrectChars) / minutes ) : 0;
    const accuracy = correctChars + incorrectChars > 0 ? (correctChars / (correctChars + incorrectChars)).toFixed(2) : 0;

    useEffect(() => {
        if(!visible){
            setShowResults(false);
            return;
        }
        async function handleResults() {
            await Swal.fire({
                title: 'Your Typing Results',
                html: `<p>WPM: ${wpm < 0 ? 0 : wpm}</p><p>Accuracy: ${(accuracy * 100).toFixed(2)}%</p>
                        <br> ${!auth?.currentUser ? '<p> Sign Up to have you WPM on the leaderboard</p>' : ""}`,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                setShowResults(true);
            }); 
            
            if(auth.currentUser){
                await saveWPMInDB(auth.currentUser, wpm, time);
            }   
        }
        handleResults();
    }, [visible]);

    async function saveWPMInDB(user, wpm, seconds) {
        if(!user) return;

        console.log("gg");
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        const username = userSnap.exists() ? userSnap.data().username: "User";

        const leaderboardRef = doc(db, "leaderboard", user.uid);

        try{
            const leaderboardSnap = await getDoc(leaderboardRef);
            if(leaderboardSnap.exists()){
                const currWpm = leaderboardSnap.data().wpm || 0;
                if(wpm > currWpm){
                    await updateDoc(leaderboardRef, {
                        seconds: String(seconds),
                        username: username,
                        wpm: String(wpm),
                        lastUpdated: serverTimestamp(),
                    });
                }
            }else{
                await setDoc(leaderboardRef, {
                    seconds: String(seconds),
                    username: username,
                    wpm: String(wpm),
                    lastUpdated: serverTimestamp(),
                });
            }
        }catch(err){

        }
    }

    return(
        <>
            {showResult ? (
                <>
                    <div className="results">
                        <span>WPM: {wpm < 0 ? 0 : wpm}</span>
                        <span>Accuracy: {accuracy * 100}</span>
                    </div>
                </>
            ) : null}
            
        </>
    )
}

export default TypingScore;