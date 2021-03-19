let Parser = require('rss-parser')
const log = require('../utils/log')
const isEmpty = require('lodash.isempty')
const get = require('lodash.get')
let parser = new Parser()

module.exports = async (ctx) => {

  if (!get(ctx, 'request.query.url')) {
    ctx.status = 400
    ctx.body='Bad request. Url param is missing.'
    return
  }
  if (isEmpty(get(ctx, 'request.query.url'))) {
    ctx.status = 400
    ctx.body='Bad request. Url param is empty.'
    return
  }

  ctx.status = 200
  ctx.body = 'feed controller says hi'
}