import React, {useEffect, useRef} from 'react';

function TextStorer({ words, statuses, currentInput, currIndex }) {

//     const containerRef = useRef(null);

//     useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;

//     // grab the <p> so we can read its computed line-height
//     const textEl = el.querySelector('.text');
//     if (!textEl) return;

//     const lineHeight = parseFloat(
//       window.getComputedStyle(textEl).lineHeight
//     );

//     // only when we overflow the box…
//     if (el.scrollHeight > el.clientHeight) {
//       // …bump the scroll by exactly one line
//       el.scrollBy({ top: lineHeight, behavior: 'auto' });
//     }
//   }, [currIndex]);

    return (
        <div className="textField" /*ref={containerRef}*/>
            {words.length > 0 ? (
                <p className="text">
                    {words.map((word, index) => {
                        if (index === currIndex) {
                            return (
                                <span key={index} className="active-word">
                                    {word.split("").map((char, charIndex) => {
                                        const userChar = currentInput[charIndex];
                                        const charClass = userChar == null ? ""
                                            : userChar === char? "correct" : "incorrect";
                                        return (
                                            <span key={charIndex} className={charClass}>
                                                {char}
                                            </span>
                                        );
                                    })}
                                    {" "}
                                </span>
                            )
                        }

                        const status = statuses[index];
                        const color = status === "correct" ? "correct" : status === "incorrect" ? "incorrect" : "";

                        return (
                            <span key={index} className={color}>
                                {word + " "}
                            </span>
                        );
                    })}
                </p>
            ) : (
                <p className="text">Loading...</p>
            )}
        </div>
    );
}

export default TextStorer;