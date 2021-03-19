const Router = require("koa-router")
const router = new Router()

const controller = require('../controllers/feed.js')




router.get('/feed', (ctx) => {
  console.log(ctx.request.query)
  controller(ctx)
})

module.exports = router