import React, { useState } from "react";

import "./index.css";

const generateHex = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

export default function App() {
  const [score, setScore] = useState(0);
  const [color, setColor] = useState("#" + generateHex(6));
  const [array, setArray] = useState(
    shuffle(["#" + generateHex(6), "#" + generateHex(6), color])
  );

  const [next, setNext] = useState(false);
  const [message, setMessage] = useState("");
  const [loseMessage, setLoseMessage] = useState("");

  const checkColor = (e) => {
    if (e === color) {
      setScore(score + 1);
      setMessage("Correct!");
    } else {
      setScore(score - 1);
      setMessage("Wrong!");
    }

    // if (score < 0) {
    //   setMessage("You lose!");
    //   return;
    // }
    setNext(true);
  };

  // make a check function that checks if score is less than 0 showing message "You lose!"
  // if score is greater than or equal to 10, show message "You win!"

  // const loseScore = () => {
  //   if (score < 0) {
  //     setLoseMessage("You lose!");
  //   }
  //   return;
  // };

  const shuffleColors = () => {
    let newColor = "#" + generateHex(6);
    setColor(newColor);
    setArray(shuffle(["#" + generateHex(6), "#" + generateHex(6), newColor]));
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return (
    <div className="color-picker">
      <h1 className="title">Color Guesser</h1>
      <div>Score: {score}</div>
      <div className="color-box" style={{ backgroundColor: color }}></div>
      <div className="btn-array">
        {array.map((item, i) => (
          <button
            className="picker-btn"
            onClick={() => checkColor(item)}
            key={i}
            style={next ? { background: item } : { background: "white" }}
          >
            <p>{item}</p>
          </button>
        ))}
      </div>
      {next && (
        <button
          className="next-btn"
          onClick={() => {
            shuffleColors();
            setMessage("");
            setNext(false);
          }}
        >
          Next
        </button>
      )}
      <div>{message}</div>
    </div>
  );
}
