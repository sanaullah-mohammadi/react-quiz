import { useReducer } from "react";
// reducer: base on the argument to return the next state  state=0 action dispatch =1
const initialState = { count: 0, step: 1 };
function reducer(state, action) {
  // console.log(state, action);
  /*   // if (action.type === "inc") return state + action.payload;
  if (action.type === "inc") return state + 1;
  // if (action.type === "dec") return state + action.payload;
  if (action.type === "dec") return state - 1;
  if (action.type === "setCount") return action.payload;
  if (action.type === "reset") return action.payload; */
  // return { count: 0, step: 1 };
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "reset":
      // return { ...state, count: 0 };
      return initialState;
    case "setStep":
      return { ...state, step: action.payload };
    default:
      throw new Error("Unkown action");
  }
}
function DateCounter() {
  // use reducer hook is the more complex way of managing state works with the use reducer functioin
  // which is always taken the previous state
  // and so called action as an argument and then will return the next state
  // const [count, setCount] = useState(0);
  // count for current state and dispatch for update the state

  // const [count, dispatch] = useReducer(reducer, 0);
  // const [step, setStep] = useState(1);
  // not for single value but also for the complex like obj

  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;
  // This mutates the date object.

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);
  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);]
    // always do for better
    // payload is opetional if not needed
    dispatch({ type: "dec" });
  };
  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };
  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    dispatch({ type: "reset" });
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
