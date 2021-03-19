const koa = require("koa")
const Router = require("koa-router")

const port = process.env.PORT || 8000

const app = new koa()
const router = new Router()

const middlewares = require('./middlewares')
const routes = require('./routes')

if (middlewares.length > 0) {
  middlewares.forEach((middleware) => {
    app.use(middleware)
  })
}

if (routes.length > 0) {
  routes.forEach((route) => {
    app.use(route.routes())
  })
}


app.use(router.routes())

const server = app.listen(port, () => {
  console.info(`Listening on port ${port}`)
})

module.exports = server

