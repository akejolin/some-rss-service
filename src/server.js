/**
* @desc App server.
* @return server - for supertests
*/


const koa = require("koa")
const Router = require("koa-router")

const isEmpty = require('lodash.isempty')

const port = process.env.PORT || 8000

const app = new koa()
const router = new Router()

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


app.use(router.routes())

const server = app.listen(port, () => {
  console.info(`Listening on port ${port}`)
})

module.exports = server

