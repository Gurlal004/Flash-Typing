import React, {useEffect, useState} from "react";
import TextStorer from "./components/TextStorer";
import UserTyper from "./components/UserTyper";
import TimeCounter from "./components/TimeCounter";
import ChooseTimeAmount from "./components/ChooseTimeAmount";
import TypingScore from "./components/TypingScore";
import './App.css';
import NavBar from "./components/NavBar";

function Typing() {
    const [words, setWords] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [input, setInput] = useState("");
    const [currIndex, setCurrIndex] = useState(0);
    const [userInputs, setUserInputs] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(10);
    const [timeSetVersion, setTimeSetVersion] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    useEffect(() => {
        document.body.classList.toggle("dark", darkMode);
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode])

    useEffect(() => {
        document.title = "Fast Typing";
    }, []);

    const fetchNewWords =() => {
        fetch("http://localhost:5001/api/words?source=api")
            .then(res => res.json())
            .then(data => {
                // const sentence = data.map(word => word.word).join(" ");
                // const words = sentence.split(" ");
                const words = data.filter(w => /^[A-Za-z]+$/.test(w));
                // const words = data;
                setWords(words);
                setStatuses(Array(words.length).fill("pending"));
            })
            .catch(error => console.log(error));
    };
    useEffect(fetchNewWords, []);

    useEffect(() => {
        setUserInputs(Array(words.length).fill(""));
    }, [words]);

    const handleInputChange = (newInput) => {
        setIsRunning(true);

        const updatedInputs = [...userInputs];
        updatedInputs[currIndex] = newInput;
        setUserInputs(updatedInputs);

        setInput(newInput);
    }

    const handleKeyDown = (e) =>{
        if(e.key === " " && input.length > 0) {
            e.preventDefault();

            if(currIndex >= words.length) return;

            const expected = words[currIndex];
            const trimmedInput = input.trim();

            const newStatuses = [...statuses];
            newStatuses[currIndex] = trimmedInput === expected ? "correct" : "incorrect";
            setStatuses(newStatuses);

            setCurrIndex(currIndex + 1);
            setInput("")
        }

        if(e.key === "Backspace") {
            if(userInputs[currIndex].length > 0){
                return;
            }
            if(currIndex > 0) {
                if (statuses[currIndex - 1] === "correct") {
                    e.preventDefault();
                } else {
                    e.preventDefault();
                    setCurrIndex(currIndex - 1);

                    const newStatuses = [...statuses];
                    newStatuses[currIndex] = setStatuses[currIndex - 1] === "pending";
                    setStatuses(newStatuses);

                    setInput(userInputs[currIndex - 1] || "");
                }
            }else{

            }
        }
    };

    const handleTimeUp = () => {
        setGameOver(true);
        setIsRunning(false);
        setShowResults(true);
    };

    const handleTimeAmountSelect = (timeAmount) => {
        setGameOver(false);
        setShowResults(false);
        setTime(timeAmount);
        setTimeSetVersion(v => v + 1);

        if(currIndex > 0){
            fetchNewWords();
        }

        setCurrIndex(0);
        setInput("");
        setStatuses(Array(words.length).fill("pending"));
        setUserInputs(Array(words.length).fill(""));
    };

    const toggleDarkMode = () => {
        setDarkMode(d => !d);
    }

    return (
        <>
            {/* <NavBar></NavBar> */}
            <div className="header">
                <TimeCounter key={timeSetVersion} className="timer" onTimeUp={handleTimeUp} isRunning={isRunning} time={time} />
                <button className="darkMode" onClick={toggleDarkMode}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
            </div>
            {/* {gameOver && <h2 className="game-over">GAME OVER!</h2>} */}
            <ChooseTimeAmount onTimeAmountSelect={handleTimeAmountSelect} isRunning={isRunning}/>
            <TypingScore input={input} words={words} userInputs={userInputs} currIndex={currIndex} time={time} visible={showResults} />
            <TextStorer words={words} statuses={statuses} currentInput={input} currIndex={currIndex}/>
            <UserTyper input={input} onInputChange={handleInputChange} onKeyDown={handleKeyDown} disabled={gameOver}/>
        </>
    );
}

export default Typing;