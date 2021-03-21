/**
* @desc Delete file on disk
* @param string $file - full file path on disk,
* @return void
*/

fs = require('fs')
const shell = require('shelljs')
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
      log.log('File delete says error: ', error)
      reject({
        code: res.status,
        message: res.statusText,
      })
      return
    }
    shell.rm('-fr', './tmp')
    resolve()
  })
})

