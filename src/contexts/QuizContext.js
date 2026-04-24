import { createContext, useEffect, useReducer } from "react";
import { useContext } from "react";
const SEC_PER_QUESTION = 30;
const QuizContext = createContext();

const initialState = {
  questions: [],
  // "loading" ,"error" ,"ready","active","finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondTimeRemaning: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFaild":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondTimeRemaning: state.questions.length * SEC_PER_QUESTION,
      };
    case "newanswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "Restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondTimeRemaning: state.secondTimeRemaning - 1,
        status: state.secondTimeRemaning === 0 ? "finished" : state.status,
      };
    // that is also great
    // return {
    //   ...state,status:"ready",index:0,answer:null,points:0,highscore:0

    // }

    default:
      throw new Error("Action unknown");
  }
}

function QuizeProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondTimeRemaning },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFaild" }));
  }, []);

  const numQuestions = questions.length;
  const maxpossiblePoints = questions.reduce((pre, cur) => pre + cur.points, 0);
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondTimeRemaning,
        maxpossiblePoints,
        numQuestions,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
export { QuizeProvider, useQuiz };
