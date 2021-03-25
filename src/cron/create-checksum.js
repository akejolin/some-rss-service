/**
* @desc Create a checksum of a file - progress
* @param string $url - the url to file,
* @return void (with promise)
*/

const fetch = require('node-fetch')

const fileWrite = require('../lib/file.write-to-disk')
const fileDelete = require('../lib/file.delete-from-disk')
const generateCkeckSum = require('../lib/checksum/generate')
const saveCheckSum = require('../lib/checksum/save')
const loadChecksumCache = require('../lib/checksum/load-cache')
const isOutOfDate = require('../lib/checksum/is-out-of-date')
const log = require('../utils/system.log')

module.exports = (url) => new Promise(async (resolve, reject) => {

  let fetchResponse = null
  let fileObj = null
  const checksumRecord = []

  // Pre fetch for headers only, to get Date Header
  try {
    fetchResponse = await fetch(url, {
      redirect: 'follow',
      size: 0,
    })
  } catch(error) {
    reject(`${error}`)
    return
  }

  if (fetchResponse === null) {
    reject('fetchResponse was empty')
    return
  }

  const requestedFileType = fetchResponse.headers.get('content-type')
  if (requestedFileType !== 'audio/mpeg') {
    reject(`file is not of type audio/mpeg`)
  }

  /* Comment: Not sure if Date header can originate to last update of cache (CF)
   * but thats how i will treat it for now.
   */
  const date = fetchResponse.headers.get('Date')
  if (date) {
    fetchResponse.date = date
  }


  let cache = []
  let cacheIsOutOfDate = true // force download as default
  try {
    cache = await loadChecksumCache()
    cacheIsOutOfDate = await isOutOfDate(url, fetchResponse.date, cache)
  } catch(error) {
    log.error(`checksum is not cached`)
  }

  // Stop process when cached checksum is still valid
  if (!cacheIsOutOfDate) {
    log.info(`Cache is still valid for ${url}`)
    resolve()
    return
  }


  // Start actual download
  try {
    fetchResponse = await fetch(url, {
      redirect: 'follow',
    })
  } catch(error) {
    reject(`${error}`)
    return
  }

  // Write to file on disk
  try {
    fileObj = await fileWrite(fetchResponse, url)
  } catch(error) {
    throw new Error(`${error}`)
  }


  // Create checksum
  let checksum = null
  try {
    checksum = await generateCkeckSum(fileObj)
    checksumRecord.push(checksum)
  } catch(error) {
    throw new Error(`${error}`)
  }

  // Save checksum to file list
  try {
    saveCheckSum(checksum, fetchResponse.date)
  } catch(error) {
    throw new Error(`${error}`)
  }

  // Clean up and delete file from disk
  try {
    await fileDelete(fileObj.file)
  } catch(error) {
    throw new Error(`${error}`)
  }

  resolve()
})
