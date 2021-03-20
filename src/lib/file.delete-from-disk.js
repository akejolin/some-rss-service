fs = require('fs')
const shell = require('shelljs')
const path = require('path')
const log = require('../utils/system.log')

const isEmpty = require('lodash.isempty')

module.exports = (file) => new Promise(async (resolve, reject) => {

  if (!fs.existsSync(file)) {
    reject({error:'file does not exist'})
  }

  fs.unlink(file, (error) => {
    if (error) {
      log.log('File delete says error: ', error)
      reject({error})
      return
    }
    resolve({response: `file ${file} is deleted`})
  })
})

