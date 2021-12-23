const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello World!!!'
  });
});

app.listen(5000, () => console.log('Server started at http://localhost:5000/'));