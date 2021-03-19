let Parser = require('rss-parser')
const log = require('../utils/log')
const isEmpty = require('lodash.isempty')
const get = require('lodash.get')
let parser = new Parser()

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


  let result = []
  try {

    result = await parser.parseURL(url)

    result = get(result, 'items', [])

    const feed = result.map((item) => ({
      title: item.title,
      file: get(item, 'enclusure.url', ''),
      checksum: 'abc'
    }))
    ctx.status = 200
    ctx.body = {feed}

  } catch(error) {
    console.log({error})
    ctx.status = 400
    ctx.body = {error}
  }

}