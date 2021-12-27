const express = require('express');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const env = require('./env');

const app = express();

app.use(express.json());

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     AccessToken:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * tags:
 *   - name: Posts
 *     description: The posts managing API
 */
const swaggerDocument = swaggerJsdoc({
  apis: ["./src/*.js"],
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Example",
      version: "1.0.0"
    }
  }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * @swagger
 * /api/posts:
 *    get:
 *      summary: Returns a welcome message to the API
 *      tags: [Posts]
 *      security:
 *        - AccessToken: []
 *      responses:
 *        200:
 *          description: The welcome message
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *        401:
 *          description: Access token is missing or invalid
 *              
 */
app.get('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, env.secretkey, (error, authData) => {
    if (error) {
      res.sendStatus(401); // Unauthorized
      return;
    }

    res.json({ message: 'Funciona el JWT!', authData });
  });
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

app.listen(env.port, () => {
  console.log(`Server started at http://localhost:${env.port}/api-docs/`);
});