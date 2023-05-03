import React, { useState, useEffect } from "react";

import styles from './CanvasPage.module.css'

const CanvasPage = () => {
  const [scrollX, setScrollX] = useState(0);
  const [messageEnd, setMessageEnd] = useState(false);
  const messages = [
    "This is the first message scrolling",
    "This is the second message scrolling",
    "This is the third message scrolling",
    "This is the fourth message scrolling",
  ];
  const [messageIndex, setMessageIndex] = useState(0);

  const message = messages[messageIndex];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextScrollX = scrollX + 1;
      setScrollX(nextScrollX);
      if (nextScrollX >= document.body.offsetWidth) {
        setMessageEnd(true);
        clearInterval(intervalId);
      }
    }, 5);

    return () => clearInterval(intervalId);
  }, [scrollX]);

  useEffect(() => {
    if (messageEnd) {
      console.log("div scroll ended");
      setMessageEnd(false);
      setMessageIndex((messageIndex + 1) % messages.length);
      setScrollX(0);
    }
  }, [messageEnd]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div className={styles.canvas} style={{ left: scrollX }}>
        <p>{message}</p>
      </div>
       
    </div>
  );
};

export default CanvasPage;
