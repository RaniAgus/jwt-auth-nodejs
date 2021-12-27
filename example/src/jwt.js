const jwt = require('jsonwebtoken');

module.exports = {
  verify: (token, secret) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decode) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(decode);
      });
    });
  }
};