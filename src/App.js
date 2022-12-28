import React, { useState } from "react";

const generateHex = (size) => {
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
};

export default function App() {}
