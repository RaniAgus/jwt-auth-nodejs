const dotenv = require('dotenv')

dotenv.config();

exports.secretkey = getOrFail('SECRET_KEY');

function getOrFail(variable) {
  return process.env[variable] || (() => { 
    throw Error(`${variable} not set or empty`)
  })();
}