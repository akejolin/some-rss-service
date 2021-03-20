const bodyParser = require('koa-bodyparser');
const healthcheck = require('./healthcheck')

/**
* @desc Sets load order of server middlewares.
* @return array
*/

module.exports = [
  healthcheck,
  bodyParser(),
]