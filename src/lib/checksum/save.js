fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const fileRead = require('../../utils/file.read')
const fileWrite = require('../../utils/file.write')

module.exports = async (_checksumObj, _diskPath='cache') => {
  const diskPath = path.resolve('.', _diskPath)
  const filePath = `${diskPath}/checksum-file-cache.json`
  let list = []

  const data = await fileRead(filePath)
  list = JSON.parse(data)

  const checksumObj = _checksumObj
  checksumObj.url = crypto.createHash('md5').update(_checksumObj.url).digest("hex")

  list = list.filter(item => item.url !== checksumObj.url)
  list.push(checksumObj)

  await fileWrite(filePath, JSON.stringify(list))

}