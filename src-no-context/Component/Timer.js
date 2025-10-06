import { useEffect } from "react";
function Timer({ dispatch, secondTimeRemaning }) {
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );

  const min = Math.floor(secondTimeRemaning / 60);
  const sec = secondTimeRemaning % 60;
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min} :{sec < 10 && "0"}
      {sec}
    </div>
  );
}

export default Timer;
