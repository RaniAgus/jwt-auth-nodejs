const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

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

app.listen(5000, () => console.log('Server started at http://localhost:5000/'));