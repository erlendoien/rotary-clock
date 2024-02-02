import React = require("react");
import Counter from "./Counter";
import { useMemo } from "react";

export interface RotaryClockProps {
  total_number: number;
  num_counters?: number
}

const RotaryClock: React.FC<RotaryClockProps> = ({ total_number, num_counters=7 }) => {
  const digits = total_number.toString().padStart(num_counters, "0").split("").map(Number);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: "1em",
      }}
    >
      {digits.map((digit, index) =>
        useMemo(() => <Counter key={index} raw_digit={digit} />, [digit])
      )}
    </div>
  );
};

export default RotaryClock;
