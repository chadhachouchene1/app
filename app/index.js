const express = require('express');
const app = express();
require('dotenv').config();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = 4000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Import the user router
const userRouter = require('./router/UserRouter');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Use the user router for /users endpoint
app.use('/user', userRouter);

mongoose.connect('mongodb://localhost:27017/application')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('database connected successfully');
});
