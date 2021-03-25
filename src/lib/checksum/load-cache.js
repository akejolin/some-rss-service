fs = require('fs')
const path = require('path')


const fileRead = require('../../utils/file.read')

module.exports = async () => new Promise(async (resolve, reject) => {
  const diskPath = path.resolve('.', 'cache')
  const filePath = `${diskPath}/checksum-file-cache.json`
  let list = []
  try {
  const data = await fileRead(filePath)
  list = JSON.parse(data)
  resolve(list)
  } catch(error) {
    reject(error)
  }
})