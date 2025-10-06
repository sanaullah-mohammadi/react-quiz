import React from "react";
import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { index, numQuestions, points, maxpossiblePoints, answer } = useQuiz();
  console.log(index, numQuestions, points, maxpossiblePoints, answer);
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        {" "}
        <strong>{points}</strong> / <strong>{maxpossiblePoints}</strong>
      </p>
    </header>
  );
}

export default Progress;
