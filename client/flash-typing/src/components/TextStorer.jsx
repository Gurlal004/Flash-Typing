import React, { useState, useEffect, useRef } from "react";

function TextStorer({ words, statuses, currentInput, currIndex }) {
  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current || words.length === 0) return;

    const el = containerRef.current;
    const style = window.getComputedStyle(el);
    const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = font;

    const maxWidth = el.clientWidth/2.1;
    const newLines = [];
    let currentLine = [];
    let currentWidth = 0;

    words.forEach((word) => {
      const wordWidth = ctx.measureText(word + " ").width;
      if (currentWidth + wordWidth > maxWidth) {
        newLines.push(currentLine);
        currentLine = [];
        currentWidth = 0;
      }
      currentLine.push(word);
      currentWidth += wordWidth;
    });

    if (currentLine.length > 0) newLines.push(currentLine);
    setLines(newLines);
  }, [words]);

  function getWordIndex(lineIdx, wordIdx) {
    return lines.slice(0, lineIdx).flat().length + wordIdx;
  }

  useEffect(() => {
    if (lines.length === 0) return;

    const currentLineWords = lines[lineIndex] || [];
    const firstWordIndex = getWordIndex(lineIndex, 0);
    const lastWordIndex = getWordIndex(lineIndex, currentLineWords.length - 1);

    if (currIndex > lastWordIndex) {
      setLineIndex((prev) => Math.min(prev + 1, lines.length - 1));
    }else if(currIndex < firstWordIndex && lineIndex > 0){
        setLineIndex((prev) => Math.max(prev-1, 0));
    }
  }, [currIndex, lines, lineIndex]);

  return (
    <div className="textField" ref={containerRef}>
      {lines.slice(lineIndex, lineIndex + 4).map((line, li) => (
        <div className="text" key={li}>
          {line.map((word, wi) => {
            const globalIndex = getWordIndex(lineIndex + li, wi);

            if (globalIndex === currIndex) {
              return (
                <span key={wi} className="active-word">
                  {word.split("").map((char, ci) => {
                    const userChar = currentInput[ci];
                    const charClass =
                      userChar == null
                        ? ""
                        : userChar === char
                        ? "correct"
                        : "incorrect";
                    return (
                      <span key={ci} className={charClass}>
                        {char}
                      </span>
                    );
                  })}
                  {" "}
                </span>
              );
            }

            const status = statuses[globalIndex];
            const color =
              status === "correct"
                ? "correct"
                : status === "incorrect"
                ? "incorrect"
                : "";

            return (
              <span key={wi} className={color}>
                {word + " "}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default TextStorer;
