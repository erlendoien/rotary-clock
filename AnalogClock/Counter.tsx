import { useCallback, useEffect, useState } from "react";
import React = require("react");
import "./Counter.css";

export interface ICounterProps {
    raw_digit: number;
  }
  
  const MAX_DIGIT = 10;
  const INTERVAL_DELAY = 75;
  
  const Counter: React.FC<ICounterProps> = ({ raw_digit }) => {
    const digit = raw_digit % MAX_DIGIT;
    const values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const [state, setState] = useState({ pos: digit, transitioning: false });
  
    const normalizeIndex = (x: number, max: number) => {
      if (x >= max) x = x % max;
      if (x < 0) x = max - (Math.abs(x) % max);
      return x;
    };
  
    const offsetAboveAndBelow = (x: number, max: number) => {
      const offsetAbove = normalizeIndex(x - 1, max);
      const offsetBelow = normalizeIndex(x + 1, max);
      return { offsetAbove, offsetBelow };
    };
  
    const moveBy = useCallback((x: number) => {
      if (x !== 0) {
        setState((prevState) => ({
          ...prevState,
          pos: normalizeIndex(prevState.pos + x, values.length),
        }));
      }
    }, [values.length]);
  
    useEffect(() => {
      let interval: ReturnType<typeof setInterval>;
      if (state.pos === raw_digit) {
        setState((prevState) => ({ ...prevState, transitioning: false }));
        return;
      }
      const startMoving = () => {
        interval = setInterval(() => {
          moveBy(1);
        }, INTERVAL_DELAY);
      };
  
      const stopMoving = () => {
        clearInterval(interval);
      };
  
      startMoving();
  
      return () => {
        stopMoving();
      };
    }, [raw_digit, state.pos, moveBy]);
  
    const { offsetAbove, offsetBelow } = offsetAboveAndBelow(state.pos, values.length);
  
    return (
      <div className={`counter ${state.transitioning ? "transitioning" : ""}`}>
        <div className="wheel">
          <div className="digit above">{values[offsetAbove]}</div>
          <div className="digit center">{values[state.pos]}</div>
          <div className="digit below">{values[offsetBelow]}</div>
        </div>
      </div>
    );
  };
  
  export default Counter;