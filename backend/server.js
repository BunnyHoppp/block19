const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

// Allow cross-origin requests (from your frontend)
app.use(cors());

// Parse JSON request body
app.use(express.json());

// Endpoint to get data by Room number
app.get('/api/room/:roomNumber', (req, res) => {
  const roomNumber = req.params.roomNumber;

  // Read the data from the JSON file
  fs.readFile('data.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read data' });
    }
    const rooms = JSON.parse(data);
    const room = rooms.find(r => r.Room === roomNumber);  // Find the room by "Room" value

    if (room) {
      res.json(room);  // Return the room data
    } else {
      res.status(404).json({ message: 'Room not found' });  // Room not found
    }
  });
});

// Set the server to listen on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
