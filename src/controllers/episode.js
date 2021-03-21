/**
* @desc Will run fetch, rss parse and format feed before return
*/

const isEmpty = require('lodash.isempty')
const get = require('lodash.get')
const fetch = require('../lib/fetch')
const fileWrite = require('../lib/file.write-to-disk')
const fileDelete = require('../lib/file.delete-from-disk')
const fileInfo = require('../lib/file.get-info')
const log = require('../utils/system.log')

module.exports = async (ctx) => {

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

  
  let fileObj = null
  let fetchResponse = null
  let errors = []
  let info = null

  // Download file
  try {
    fetchResponse = await fetch(url)
  } catch(error) {
    ctx.status = error.status
    ctx.body = {error: {
      code: error.status,
      message: error.statusText,
    }}
    return
  }

  // Write to file on disk
  try {
    fileObj = await fileWrite(fetchResponse, url)
  } catch(error) {
    ctx.status = error.code
    ctx.body = {error}
    return
  }

  // Get file info
  try {
    info = await fileInfo(fileObj.file)
  } catch(error) {
    log.log('file delete error', error)
    errors.push(error)
  }

  // Delete file from disk
  try {
    await fileDelete(fileObj.file)
  } catch(error) {
    log.log('file delete error', error)
    errors.push(error)
  }

  if (isEmpty(errors)) {
    ctx.status = 200
    ctx.body = info
  } else {
    ctx.status = 502
    ctx.body = errors
  }
}