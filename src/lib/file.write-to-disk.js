/**
* @desc write a fetched file to disk.
* @param object $fetchResponse - the response object from fetch,
* @param string $url - the fetched url,
* @return object - file object with
*/

const fs = require('fs')
const shell = require('shelljs')
const path = require('path')
const log = require('../utils/system.log')
const crypto = require('crypto')
const getFileExt = require('../utils/file.get-ext')
module.exports = (fetchResponse, url, _diskPath = 'tmp') => new Promise(async (resolve, reject) => {
  const diskPath = path.resolve('.', _diskPath)
  if (!fs.existsSync(diskPath)) {
    shell.mkdir('-p', diskPath)
  }

  let res = fetchResponse

  const fileName = crypto.createHash('md5').update(url).digest("hex");
  const ext = getFileExt(url)
  const fullDiskPathToFile = `${diskPath}/${fileName}.${ext}`

  const fileWriter = fs.createWriteStream(fullDiskPathToFile)
  fileWriter.on('finish', () => {
    resolve({file: fullDiskPathToFile, url})
  })
  try {
    await res.body.pipe(fileWriter)
  } catch(err) {
    log.log(`write file to disk error`, err)
    reject({
      code: 500,
      message: err,
    })
  }
})

