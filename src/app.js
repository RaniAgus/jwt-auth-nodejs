const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const env = require('./env');

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

app.post('/api/posts', (req, res) => {
  res.json({
    message: 'Post created...'
  });
});

app.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: 'raniagus',
    email: 'agus@rani.com'
  };

  jwt.sign({ user }, env.secretkey, (error, token) => {
    res.json({ token });
  });
});

app.listen(5000, () => console.log('Server started at http://localhost:5000/'));