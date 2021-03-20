/**
* @desc Route middleware.
*/
const Router = require("koa-router")
const router = new Router()

const controller = require('../controllers/episode.js')

router.get('/episode', async (ctx, next) => {
  await controller(ctx)
  await next()
})

module.exports = router