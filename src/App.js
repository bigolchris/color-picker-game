import React, { useState } from "react";

const generateHex = (size) => {
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
};

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
}
