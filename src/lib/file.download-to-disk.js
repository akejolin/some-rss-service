fs = require('fs')
const shell = require('shelljs')
const path = require('path')
const fetch = require('node-fetch')
const log = require('../utils/system.log')
const crypto = require('crypto')

const isEmpty = require('lodash.isempty')


const getFileExt = require('../utils/file.get-ext')
module.exports = (url) => new Promise(async (resolve, reject) => {
  console.log('delete started')
  const _diskPath = 'tmp'
  const diskPath = path.resolve('.', _diskPath)
  if (!fs.existsSync(diskPath)) {
    shell.mkdir('-p', diskPath)
  }

  let res = null
  try {
    res = await fetch(url)
  } catch(err){
    log.log(err)
    reject(err)
    return
  }

  const fileName = crypto.createHash('md5').update(url).digest("hex");
  const ext = getFileExt(url)
  const fullDiskPathToFile = `${diskPath}/${fileName}.${ext}`

  const fileWriter = fs.createWriteStream(fullDiskPathToFile)
  fileWriter.on('finish', () => {
    log.log(`download completed`)
    resolve({file: fullDiskPathToFile, url})
  })
  try {
    await res.body.pipe(fileWriter)
    log.log(`download file: ${url}`)
  } catch(err) {
    log.log(err)
    reject(err)
  }
})

