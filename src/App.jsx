import React, { useState, useEffect } from 'react';

function App() {
  const [roomInput, setRoomInput] = useState('');
  const [roomData, setRoomData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // You can fetch the local JSON file during the initial render if needed
  }, []);

  const handleSubmit = async () => {
    if (!roomInput) {
      setErrorMessage('Please enter a room number.');
      return;
    }

    try {
      const response = await fetch('/data.json'); // Assuming your file is in the public folder
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      const room = data.find(item => item.Room === roomInput);
      if (room) {
        setRoomData(room);
        setErrorMessage('');
      } else {
        setErrorMessage('Room not found.');
        setRoomData(null);
      }
    } catch (error) {
      console.error('Error fetching JSON data:', error);
      setErrorMessage('Error fetching room data. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Enter Room Number</h1>
      <input
        type="text"
        value={roomInput}
        onChange={(e) => setRoomInput(e.target.value)}
        placeholder="Enter Room Number (e.g., 19/1/A)"
      />
      <button onClick={handleSubmit}>Submit</button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {roomData && (
        <div>
          <h2>Room Data</h2>
          <p><strong>Room:</strong> {roomData.Room}</p>
          <p><strong>Beach:</strong> {roomData.Beach ? 'Yes' : 'No'}</p>
          <p><strong>CNY:</strong> {roomData.CNY ? 'Yes' : 'No'}</p>
          <p><strong>Doorcard:</strong> {roomData.Doorcard ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
}

export default App;
