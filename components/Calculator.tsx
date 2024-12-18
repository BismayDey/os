"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [operator, setOperator] = useState<string | null>(null);
  const [prevValue, setPrevValue] = useState<number | null>(null);

  const handleNumberClick = (num: string) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num));
  };

  const handleOperatorClick = (op: string) => {
    setOperator(op);
    setPrevValue(parseFloat(display));
    setDisplay("0");
  };

  const handleEquals = () => {
    if (operator && prevValue !== null) {
      const currentValue = parseFloat(display);
      let result: number;
      switch (operator) {
        case "+":
          result = prevValue + currentValue;
          break;
        case "-":
          result = prevValue - currentValue;
          break;
        case "*":
          result = prevValue * currentValue;
          break;
        case "/":
          result = prevValue / currentValue;
          break;
        default:
          return;
      }
      setDisplay(result.toString());
      setOperator(null);
      setPrevValue(null);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setOperator(null);
    setPrevValue(null);
  };

  return (
    <div className="grid grid-cols-4 gap-2 p-4">
      <div className="col-span-4 bg-gray-100 p-2 text-right mb-2 rounded">
        {display}
      </div>
      {["7", "8", "9", "/"].map((btn) => (
        <Button
          key={btn}
          onClick={() =>
            isNaN(parseInt(btn))
              ? handleOperatorClick(btn)
              : handleNumberClick(btn)
          }
        >
          {btn}
        </Button>
      ))}
      {["4", "5", "6", "*"].map((btn) => (
        <Button
          key={btn}
          onClick={() =>
            isNaN(parseInt(btn))
              ? handleOperatorClick(btn)
              : handleNumberClick(btn)
          }
        >
          {btn}
        </Button>
      ))}
      {["1", "2", "3", "-"].map((btn) => (
        <Button
          key={btn}
          onClick={() =>
            isNaN(parseInt(btn))
              ? handleOperatorClick(btn)
              : handleNumberClick(btn)
          }
        >
          {btn}
        </Button>
      ))}
      {["0", ".", "=", "+"].map((btn) => (
        <Button
          key={btn}
          onClick={() => {
            if (btn === "=") handleEquals();
            else if (btn === ".") handleNumberClick(btn);
            else if (isNaN(parseInt(btn))) handleOperatorClick(btn);
            else handleNumberClick(btn);
          }}
        >
          {btn}
        </Button>
      ))}
      <Button onClick={handleClear} className="col-span-4">
        Clear
      </Button>
    </div>
  );
}
