const isEmpty = require('lodash.isempty')
const get = require('lodash.get')
const getFeed = require('./getFeed')
const formatFeed = require('./formatFeed')

module.exports = async (ctx, next) => {

  const url = get(ctx, 'request.query.url')

  // Param validation
  if (!url) {
    ctx.status = 400
    ctx.body={error: 'Bad request. Url param is missing.'}
    return
  }
  if (isEmpty(url)) {
    ctx.status = 400
    ctx.body={error: 'Bad request. Url param is empty.'}
    return
  }
  const protocolRegExp = /^(http|https):\/\//i
  if (!protocolRegExp.test(url)) {
    ctx.status = 400
    ctx.body={error: 'Bad request. Url param is invalid.'}
    return
  }

  // Get feed and parse
  try {
    let feed = await getFeed(url)
    feed = formatFeed(feed)

    ctx.status = 200
    ctx.body = feed
  } catch(error) {
    ctx.status = error.code
    ctx.body = {error}
  }
}