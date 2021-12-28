const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const jwt = require('./jwt');
const env = require('./env');
const User = require('./user');

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
 *      summary: >
 *        Returns a welcome message and the authentication data retreived from
 *        token
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
 *                  authData:
 *                    type: object
 *                    properties:
 *                      user:
 *                        $ref: '#/components/schemas/User'
 *                      iat:
 *                        type: integer
 *                        format: int64
 *                      exp:
 *                        type: integer
 *                        format: int64
 *        401:
 *          description: Access token is missing or invalid
 *              
 */
app.get('/api/posts', verifyToken, (req, res) => {
  res.json({ message: 'Funciona el JWT!', authData: req.authData });
});

// TOKEN FORMAT
// Authorization: Bearer <access_token>

// Verify Token
async function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];

  // Check if bearer is undefined
  if (typeof(bearerHeader) === 'undefined') {
    return res.sendStatus(401); // Unauthorized
  }

  // Split at the space and get token from array
  const [bearer, token] = bearerHeader.split(' ');
  if (bearer !== 'Bearer') {
    return res.sendStatus(401); // Unauthorized
  }

  // Get auth data from token
  try {
    req.authData = await jwt.verify(token, env.secretkey);
  } catch(error) {
    return res.sendStatus(401); // Unauthorized
  }

  // Next middleware
  return next();
}

app.listen(env.port, () => {
  console.log(`Example started at http://localhost:${env.port}/api-docs/`);
});