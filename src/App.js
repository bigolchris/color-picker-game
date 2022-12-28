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

  const checkColor = (e) => {
    if (e === color) {
      setScore(score + 1);
      setMessage("Correct!");
    } else {
      setMessage("Wrong!");
    }
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
    <div
      className="color-picker"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1em",
      }}
    >
      <div>Score: {score}</div>
      <div
        style={{ width: "250px", height: "250px", backgroundColor: color }}
      ></div>
      <div style={{ display: "flex", gap: "2em" }}>
        {array.map((item, i) => (
          <button
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
