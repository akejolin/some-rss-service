const Router = require("koa-router")
const router = new Router()

router.get('/', (ctx, next) => {
  next()
  ctx.body = {response: 'Welcome!'}
})

module.exports = router