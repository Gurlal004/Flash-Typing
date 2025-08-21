import React, {useEffect,useState} from 'react';

function TimeCounter({onTimeUp, isRunning, time}){
    const [timeLeft, setTimeLeft] = useState(() => time);
    const [timeColor, setTimeColor] = useState(localStorage.getItem("darkMode") === "true"? "white" : "black");

    useEffect(() => {
        setTimeLeft(time);
    }, [time]);
    
    useEffect(() =>{
        setTimeColor(timeLeft <= 10 ? "incorrect" : timeLeft <=30 ? "medium" : "correct");
    },[timeLeft]);

    useEffect(() => {
        if(!isRunning) return;

        if(isRunning) {
            const interval = setInterval(() => {
                setTimeLeft(prev => {
                    const next = prev - 1;
                    if (next === 0) {
                        clearInterval(interval);
                        setTimeout(onTimeUp, 0);
                    }
                    return next;
                });
            }, 1000);
            return () => clearInterval(interval);
        }

    }, [isRunning, time]);

    return (
        <div>
            <h2 className={isRunning ? timeColor : "white"}>Time Left: {timeLeft}</h2>
        </div>
    )
}

export default TimeCounter;