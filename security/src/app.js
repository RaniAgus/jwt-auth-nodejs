const express = require('express');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const env = require('./env');

const app = express();

app.use(express.json());

/**
 * @swagger
 * tags:
 *   - name: Security
 *     description: The security managing API
 */
const swaggerDocument = swaggerJsdoc({
  apis: ["./src/*.js"],
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Security",
      version: "1.0.0"
    }
  }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * @swagger
 * /api/login:
 *    post:
 *      summary: Login an user
 *      tags: [Security]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  username:
 *                    type: string
 *                  password:
 *                    type: string
 *      responses:
 *        200:
 *          description: The authentication token
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *        401:
 *          description: Invalid username or password
 *        500:
 *          description: Some server error
 *              
 */
app.post('/api/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.sendStatus(401); // Unauthorized
    return;
  }

  // Mock user
  const user = {
    id: 1,
    username: req.body.username,
    email: `${req.body.username}@example.com`
  };

  jwt.sign(
    { user }, 
    env.secretkey,
    { expiresIn: '1h' },
    (error, token) => {
      if (error) {
        res.sendStatus(500); // Internal server error
      }

      res.json({ token });
    }
  );

});

app.listen(env.port, () => {
  console.log(`Server started at http://localhost:${env.port}/api-docs/`);
});