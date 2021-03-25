/**
* @desc Cron server.
* @return server - for supertests
*/

const koa = require("koa")

const shell = require('shelljs')
const isEmpty = require('lodash.isempty')


const port = process.env.PORT || 8001

const app = new koa()

const createCacheFile = require('./lib/checksum/create-cache-file')
const cronJobs = require('./cron')
const middlewares = require('./middlewares')


if (!isEmpty(middlewares)) {
  middlewares.forEach((middleware) => {
    app.use(middleware)
  })
}

const server = app.listen(port, () => {
  console.info(`Listening on port ${port}`)
})


createCacheFile('cache', 'checksum-file-cache.json', [])



// Clean up previous downloads
shell.rm('-fr', 'tmp')


if (!isEmpty(cronJobs)) {
  cronJobs.forEach((cronjob) => {
    cronjob.start()
  })
}

module.exports = server

