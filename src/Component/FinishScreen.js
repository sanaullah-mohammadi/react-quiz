import { useQuiz } from "../contexts/QuizContext";
function FinishScreen() {
  const { points, maxpossiblePoints, highscore, dispatch } = useQuiz();
  const percentage = (points / maxpossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🎖️";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 80) emoji = "🥉";
  if (percentage > 0 && percentage < 50) emoji = "4️⃣";
  if (percentage === 0) emoji = "😭";
  return (
    <>
      <p className="result">
        {emoji} You scored <strong>{points}</strong> Out of {maxpossiblePoints}{" "}
        ( {Math.ceil(percentage)} %)
      </p>
      <p className="highscore">Hightscore : {highscore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "Restart" })}
      >
        {" "}
        Restart Quiz
      </button>
    </>
  );
}
export default FinishScreen;
