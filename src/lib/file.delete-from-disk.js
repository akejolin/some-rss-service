/**
* @desc Delete file on disk
* @param string $file - full file path on disk,
* @return void
*/

const fs = require('fs')
const log = require('../utils/system.log')

module.exports = (file) => new Promise(async (resolve, reject) => {

  if (!fs.existsSync(file)) {
    reject({
      code: 502,
      message: 'File to delete does not exist',
    })
  }

  fs.unlink(file, (error) => {
    if (error) {
      log.error(error)
      reject({
        code: 500,
        message: 'file delete error',
      })
      return
    }
    
    resolve()
  })
})

