import React, { useState } from "react";
import "./count.css";

type InputCountProps = {};

const InputCount: React.FC<InputCountProps> = () => {
  const [num, setNum] = useState<string>("");
  const [result, setResult] = useState<number[]>([]);
  const [numParts, setNumParts] = useState<number>(10);

  const handleCalculate = () => {
    if (!num) return;

    const number: number = parseInt(num);

    let parts: number[] = getParts(numParts);

    let totalParts: number = parts.reduce((acc, part) => acc + part, 0);
    const ratio: number = number / totalParts;

    let remaining: number = number;

    const calculatedParts: number[] = parts.map((part) => {
      const calculatedPart: number = ratio * part;
      const roundedPart: number = Math.round(calculatedPart);
      remaining -= roundedPart;
      return roundedPart;
    });

    calculatedParts[calculatedParts.length - 1] += remaining;

    setResult(calculatedParts);
  };

  const getParts = (numParts: number): number[] => {
    switch (numParts) {
      case 5:
        return [15, 5, 12, 8, 20];
      case 6:
        return [15, 5, 12, 8, 20, 17];
      case 7:
        return [15, 5, 12, 8, 20, 17, 13];
      case 8:
        return [15, 5, 12, 8, 20, 17, 13, 6];
      case 9:
        return [15, 5, 12, 8, 20, 17, 13, 6, 22];
      case 10:
        return [15, 5, 12, 8, 20, 17, 13, 6, 22, 10];
      case 11:
        return [15, 5, 12, 8, 20, 17, 13, 6, 22, 10, 19];
      case 12:
        return [15, 5, 12, 8, 20, 17, 13, 6, 22, 10, 19, 14];
      case 13:
        return [15, 5, 12, 8, 20, 17, 13, 6, 22, 10, 19, 14, 9];
      case 14:
        return [15, 5, 12, 8, 20, 17, 13, 6, 22, 10, 19, 14, 9, 18];
      case 15:
        return [15, 5, 12, 8, 20, 17, 13, 6, 22, 10, 19, 14, 9, 18, 12];
      default:
        return [15, 5, 12, 8, 20, 17, 13, 6, 22, 10];
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNumParts(parseInt(e.target.value));
  };

  return (
    <div className="calculator">
      <p className="calculator-title">Введите число:</p>

      <div className="input-section">
        <input
          type="number"
          className="num-input"
          placeholder="Введите число"
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />
        <select
          className="select-input"
          value={numParts}
          onChange={handleSelectChange}
        >
          {[...Array(10).keys()].map((index) => (
            <option key={index} value={index + 6}>
              {index + 6}
            </option>
          ))}
        </select>
        <button className="calculate-btn" onClick={handleCalculate}>
          Рассчитать
        </button>
      </div>
      <div className="result-section">
        {result.length > 0 && (
          <div className="result">
            {result.map((part, index) => (
              <div key={index} className="result-item">
                {part}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputCount;
