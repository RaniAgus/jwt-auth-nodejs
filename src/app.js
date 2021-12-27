const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const env = require('./env');

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, env.secretkey, (error, authData) => {
    if (error) {
      res.sendStatus(401); // Unauthorized
      return;
    }

    res.json({ message: 'Post created...', authData });
  });
});

app.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: 'raniagus',
    email: 'agus@rani.com'
  };

  jwt.sign(
    { user }, 
    env.secretkey,
    { expiresIn: '30s' },
    (error, token) => {
      if (error) {
        res.sendStatus(500); // Internal server error
      }

      res.json({ token });
    }
  );

});

// TOKEN FORMAT
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];

  // Check if bearer is undefined
  if (typeof(bearerHeader) === 'undefined') {
    res.sendStatus(401); // Unauthorized
    return;
  }

  // Split at the space and get token from array
  const [bearer, token] = bearerHeader.split(' ');
  if (bearer !== 'Bearer') {
    res.sendStatus(401); // Unauthorized
    return;
  }

  // Set the token
  req.token = token;

  // Next middleware
  next();
}

app.listen(5000, () => console.log('Server started at http://localhost:5000/'));