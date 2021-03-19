const Router = require("koa-router")
const router = new Router()

const controller = require('../controllers/feed.controller.js')

router.get('/feed', async (ctx, next) => {
  await controller(ctx, next)
  next()
})

module.exports = router