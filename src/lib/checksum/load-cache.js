fs = require('fs')
const path = require('path')


const fileRead = require('../../utils/file.read')

module.exports = async (_diskPath='cache', fileName='checksum-file-cache.json') => new Promise(async (resolve, reject) => {
  const diskPath = path.resolve('.', _diskPath)
  const filePath = `${diskPath}/${fileName}`
  let list = []
  try {
    const data = await fileRead(filePath)
    list = JSON.parse(data)
    resolve(list)
  } catch(error) {
    reject([])
  }
})