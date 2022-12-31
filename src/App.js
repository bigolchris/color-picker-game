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
  const [lose, setLose] = useState("");
  const [win, setWin] = useState("");

  const checkWin = () => {
    if (score >= 10) {
      setWin("You Win!");
    } else {
      setWin("");
    }
  };

  const checkLose = () => {
    if (score <= -1) {
      setLose("You Lose! guess again until you're not negative");
    } else {
      setLose("");
    }
  };

  const checkColor = (e) => {
    if (e === color) {
      setScore(score + 1);
      setMessage("Correct!");
    } else {
      setScore(score - 1);
      setMessage("Wrong!");
    }
    checkLose();
    checkWin();

    setNext(true);
  };

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
      <div>{win}</div>
      <div>{lose}</div>
    </div>
  );
}
