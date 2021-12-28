
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         username:
 *           type: string
 *         email:
 *           type: string
 */
module.exports = class User {
  constructor({id, username, email}) {
    this.id = id;
    this.username = username;
    this.email = email;
  }
}