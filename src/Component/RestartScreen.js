import { useQuiz } from "../contexts/QuizContext";
function RestartScreen() {
  const { dispatch } = useQuiz();
  return (
    <button
      className="btn btn-ui"
      onClick={() => {
        dispatch({ type: "Restart" });
      }}
    >
      Restart Quiz
    </button>
  );
}
export default RestartScreen;
