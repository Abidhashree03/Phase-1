import React, { useState } from 'react';
import './styles.css';

function App() {
  const [input, setInput] = useState('');
  const [operator, setOperator] = useState('');
  const [firstOperand, setFirstOperand] = useState('');
  const [result, setResult] = useState(null);

  const handleNumberClick = (value) => {
    setInput(input + value);
  };

  const handleOperatorClick = (op) => {
    if (input === '') return;
    setFirstOperand(input);
    setOperator(op);
    setInput('');
  };

  const handleClear = () => {
    setInput('');
    setFirstOperand('');
    setOperator('');
    setResult(null);
  };

  const handleEqual = () => {
    if (firstOperand === '' || input === '' || operator === '') return;

    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(input);
    let res = 0;

    switch (operator) {
      case '+':
        res = num1 + num2;
        break;
      case '-':
        res = num1 - num2;
        break;
      case '*':
        res = num1 * num2;
        break;
      case '/':
        res = num2 !== 0 ? num1 / num2 : 'Error';
        break;
      default:
        res = 0;
    }

    setResult(res);
    setInput('');
    setOperator('');
    setFirstOperand('');
  };

  return (
    <div className="calculator">
      <h1>Simple Calculator</h1>
      <div className="display">{input || result || '0'}</div>

      <div className="buttons">
        <div className="number-buttons">
          {[1,2,3,4,5,6,7,8,9,0].map((num) => (
            <button key={num} onClick={() => handleNumberClick(num)}>{num}</button>
          ))}
        </div>

        <div className="operator-buttons">
          {['+', '-', '*', '/'].map((op) => (
            <button key={op} onClick={() => handleOperatorClick(op)}>{op}</button>
          ))}
        </div>

        <div className="extra-buttons">
          <button onClick={handleEqual}>=</button>
          <button onClick={handleClear}>C</button>
        </div>
      </div>
    </div>
  );
}

export default App;
