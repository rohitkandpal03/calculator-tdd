import { ChangeEvent, FC, useState } from "react";
import "./StringCalculator.css";

/**
 * String Calculator
 * Takes a string of comma-separated numbers and returns their sum
 * @param {string} numbers - A string containing comma-separated numbers
 * @returns {number} - The sum of the numbers
 */
export const add = (numbers: string): number => {
  // If the input is an empty string, return 0
  if (numbers === "") {
    return 0;
  }

  // Split the input string by comma and convert each part to a number
  const numbersArray = numbers
    .split(",")
    .map((num) => parseInt(num.trim(), 10));

  // Calculate the sum of all numbers
  return numbersArray.reduce((sum, num) => sum + num, 0);
};

const StringCalculator: FC = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCalculate = () => {
    setResult(add(input));
  };

  return (
    <div className="string-calculator">
      <h2>String Calculator</h2>
      <div className="calculator-input">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter comma-separated numbers"
        />
        <button onClick={handleCalculate}>Calculate</button>
      </div>
      {!result && (
        <div className="calculator-result">
          <p>Result: {result}</p>
        </div>
      )}
    </div>
  );
};

export default StringCalculator;
