import React, { useState } from 'react';
import './App.css';  // Import the CSS file if you want to style separately

function App() {
  // State to store the input value
  const [inputValue, setInputValue] = useState('');

  // Handler for input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="App">
      {/* Header */}
      <h1>Input your room number here</h1>

      {/* Input field */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Room number"
        className="input-field"
      />

      {/* Display entered value */}
      <p>You entered: {inputValue}</p>
    </div>
  );
}

export default App;
