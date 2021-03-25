/**
* @desc App server.
* @return server - for supertests
*/

const koa = require("koa")

const shell = require('shelljs')
const isEmpty = require('lodash.isempty')


const port = process.env.PORT || 8000

const app = new koa()

const createCacheFile = require('./lib/create-cache-file')
const cronJobs = require('./cron')
const middlewares = require('./middlewares')
const routes = require('./routes')

if (!isEmpty(middlewares)) {
  middlewares.forEach((middleware) => {
    app.use(middleware)
  })
}

if (!isEmpty(routes)) {
  routes.forEach((route) => {
    app.use(route.routes())
  })
}

const server = app.listen(port, () => {
  console.info(`Listening on port ${port}`)
})


createCacheFile('cache', 'checksum-file-cache.json', [])



// Clean up prevoius downloads
shell.rm('-fr', 'tmp')


if (!isEmpty(cronJobs)) {
  cronJobs.forEach((cronjob) => {
    cronjob.start()
  })
}

module.exports = server

