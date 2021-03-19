const koa = require("koa")
const Router = require("koa-router")

const port = process.env.PORT || 8000

const app = new koa()
const router = new Router()


router.get('/', (ctx) => {
  ctx.body = 'hello world'
})


app.use(router.routes())

const server = app.listen(port, () => {
  console.info(`Listening on port ${port}`)
})

module.exports = server

