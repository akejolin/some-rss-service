const Router = require("koa-router")
const router = new Router()

const controller = require('../controllers/feed.js')

router.get('/feed', async (ctx, next) => {
  await controller(ctx, next)
  await next()
})

module.exports = router