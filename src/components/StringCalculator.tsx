import { ChangeEvent, FC, useState } from "react";
import "./StringCalculator.css";
import { add } from "./helper";

const StringCalculator: FC = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCalculate = () => {
    try {
      setResult(add(input));
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setResult(null);
    }
  };

  return (
    <div className="string-calculator">
      <h2>String Calculator</h2>
      <div className="calculator-input">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter numbers (comma or newline separated, or //[delimiter]\n format)"
        />
        <button onClick={handleCalculate}>Calculate</button>
      </div>
      {!!result && (
        <div className="calculator-result">
          <p>Result: {result}</p>
        </div>
      )}
      {!!error && (
        <div className="calculator-error">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default StringCalculator;
