const Router = require("koa-router")
const router = new Router()

router.get('/feed', (ctx) => {
  ctx.body = 'my feed'
})

module.exports = router