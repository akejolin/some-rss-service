const bodyParser = require('koa-bodyparser');
const healthcheck = require('./healthcheck')

module.exports = [
  healthcheck,
  bodyParser(),
]