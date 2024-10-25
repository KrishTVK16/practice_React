// src/App.js
import React, { useState } from 'react';
import './App.css';
import NumberStats from './NumberStats';

function App() {
  const [numbers, setNumbers] = useState([]);
  const [input, setInput] = useState('');

  const handleCalculate = () => {
    const parsedNumbers = input
      .split(/[\s,]+/) // Split by spaces or commas
      .map(num => parseFloat(num.trim()))
      .filter(num => !isNaN(num)); // Filter out invalid numbers

    setNumbers(parsedNumbers);  // Set the valid numbers to state
    setInput('');  // Clear the input field
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    // Allow only numbers, commas, and spaces
    if (!/[0-9, ]/.test(key)) {
      event.preventDefault(); // Prevent default action if key is invalid
    }
  };

  return (
    <div className="App">
      <h1>Number Stats</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress} // Add key press handler
          placeholder="Enter numbers separated by commas or spaces"
          style={{ width: '50%' }} // Set input width to half the page
        />
        <button onClick={handleCalculate}>Calculate</button>
      </div>

      {numbers.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Entered Numbers:</h3>
          <p>{numbers.join(', ')}</p>
        </div>
      )}

      <NumberStats numbers={numbers} />
    </div>
  );
}

export default App;
