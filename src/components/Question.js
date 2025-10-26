import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Set up timer that decrements timeRemaining every second
    const timerId = setTimeout(() => {
      if (timeRemaining > 1) {
        // Decrement the timer if time remaining
        setTimeRemaining(prevTime => prevTime - 1);
      } else {
        // Time's up! Reset the timer and call onAnswered with false
        setTimeRemaining(10);
        onAnswered(false);
      }
    }, 1000);

    // Return cleanup function to clear timeout on unmount
    return () => clearTimeout(timerId);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
