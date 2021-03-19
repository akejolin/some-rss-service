let Parser = require('rss-parser')
const log = require('../utils/log')
const isEmpty = require('lodash.isempty')
const get = require('lodash.get')
let parser = new Parser()

module.exports = async (ctx) => {

  // Param validation
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
  
  const protocolRegExp = /^(http|https):\/\//i
  if (!protocolRegExp.test(get(ctx, 'request.query.url'))) {
    ctx.status = 400
    ctx.body='Bad request. Url param is invalid.'
    return
  }

  ctx.status = 200
  ctx.body = 'feed controller says hi'
}