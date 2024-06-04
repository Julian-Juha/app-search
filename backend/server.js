import {ENVconfig} from './config/PROD-env'

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(ENVconfig.mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model
const dataSchema = new mongoose.Schema({
  reporter: String,
  category: String,
  description: String
});

// Model or Index
const Data = mongoose.model('Data', dataSchema);

// Define routes
app.post('/api/data', async (req, res) => {
  const { name, value } = req.body;
  const newData = new Data({ name, value });
// hir mal was statisch rein posten um zu gucken ob das klappt 
  try {
    await newData.save();
    res.status(201).json(newData);


  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
