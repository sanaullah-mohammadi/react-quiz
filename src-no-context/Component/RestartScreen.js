function RestartScreen({ dispatch }) {
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
