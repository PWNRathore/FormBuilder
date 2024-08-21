const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./dbconfig/db');
const formRoutes = require('./routes/FormRoutes');

const app = express();
const port = 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', formRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
