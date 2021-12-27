const dotenv = require('dotenv')

dotenv.config();

module.exports = {
  secretkey: getOrFail('SECRET_KEY'),
  port: getOrFail('PORT')
}

function getOrFail(variable) {
  return process.env[variable] || (() => { 
    throw Error(`${variable} not set or empty`)
  })();
}