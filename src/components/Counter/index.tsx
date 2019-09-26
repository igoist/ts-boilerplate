import * as React from 'react';
const { useState, useEffect } = React;

const useCounter = (initialState = 0) => {
  let [count, setCount] = useState(initialState);
  let decrement = () => setCount(count - 1);
  let increment = () => setCount(count + 1);
  return { count, decrement, increment };
};

const Counter = () => {
  const counter = useCounter();

  return (
    <div>
      <button onClick={counter.decrement}>-</button>
      <span>{counter.count}</span>
      <button onClick={counter.increment}>+</button>
    </div>
  );
};

export default Counter;
