/**
* @desc Create a checksum - progress
* @param string $url - the url to file,
* @return promise
*/

const fetch = require('node-fetch')

const fileWrite = require('../../lib/file.write-to-disk')
const fileDelete = require('../../lib/file.delete-from-disk')
const generateCkeckSum = require('../checksum/generate')
const saveCheckSum = require('../checksum/save')

module.exports = (url) => new Promise(async (resolve, reject) => {

  let fetchResponse = null
  let fileObj = null
  const checksumRecord = []

  // Download file
  try {
    fetchResponse = await fetch(url, {
      redirect: 'follow',
    })
  } catch(error) {
    reject(`${error}`)
    return
  }

  if (fetchResponse === null) {
    throw new Error('fetchResponse is empty')
    return
  }

  const requestedFileType = fetchResponse.headers.get('content-type')
  if (requestedFileType !== 'audio/mpeg') {
    reject(`file is not of type audio/mpeg`)
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
    checksum = await generateCkeckSum(fileObj, url)
    checksumRecord.push(checksum)
  } catch(error) {
    throw new Error(`${error}`)
  }

  // Save checksum to file list
  try {
    const res = saveCheckSum(checksum)
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
