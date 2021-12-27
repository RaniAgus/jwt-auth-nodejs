const jwt = require('jsonwebtoken');

module.exports = {
  sign: (payload, secret, options) => {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(token);
      });
    });
  }
};