import {use, useEffect, useState} from "react";
import Swal from 'sweetalert2';

function TypingScore({input, words, userInputs, currIndex, time, visible }) {
    if(!visible) return null;

    const [showResult, setShowResults] = useState(false);

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
        Swal.fire({
            title: 'Your Typing Results',
            html: `<p>WPM: ${wpm < 0 ? 0 : wpm}</p><p>Accuracy: ${(accuracy * 100).toFixed(2)}%</p>`,
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            setShowResults(true);
        });
    }, [visible]);

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