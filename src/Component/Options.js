import React from "react";
import { useQuiz } from "../contexts/QuizContext";
function Options({ question }) {
  const { dispatch, answer } = useQuiz();
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswer
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswer}
          key={option}
          onClick={() => dispatch({ type: "newanswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
