// Import required modules
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // For serving static files
const { appendRsvp } = require('./lib/rsvpSheets');

const app = express();

// Middleware for parsing JSON
app.use(bodyParser.json());

// Configure CORS to allow requests from specific origins
const allowedOrigins = [
  'http://localhost:3000', // Local development frontend
  'http://localhost:3001',
  'https://jaque-lucas.vercel.app',
  'https://dasidi-404122d2abe9.herokuapp.com', 
  'https://www.damarisidiclei.love', 
  'http://www.damarisidiclei.love', 
  
];

const envAllowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
allowedOrigins.push(...envAllowedOrigins);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., Postman) or from allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

// Endpoint to handle RSVP submissions
const handleRsvpSubmission = async (req, res) => {
  const { firstName, lastName, people, whoComing, allergies } = req.body;

  console.log('Received RSVP submission:', {  firstName, lastName, people, whoComing, allergies  });

  try {
    const response = await appendRsvp({ firstName, lastName, people, whoComing, allergies });
    console.log('RSVP submitted to Google Sheets successfully:', response.data);
    res.status(200).send('RSVP submitted successfully!');
  } catch (error) {
    console.error('Error submitting RSVP to Google Sheets:', error);
    res.status(500).send('Error submitting RSVP');
  }
};

app.post('/submit-rsvp', handleRsvpSubmission);
app.post('/api/submit-rsvp', handleRsvpSubmission);

const buildPath = path.join(__dirname, 'build');
const publicPath = path.join(__dirname, 'public');

// Check if 'build' exists, else use 'public'
const staticPath = fs.existsSync(buildPath) ? buildPath : publicPath;

// Serve static files
app.use(express.static(staticPath));

// Fallback for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
