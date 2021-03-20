fs = require('fs')
const shell = require('shelljs')
const path = require('path')
const log = require('../utils/system.log')
const mm = require('music-metadata')

const isEmpty = require('lodash.isempty')

module.exports = (file) => new Promise(async (resolve, reject) => {

  try {
    const metadata = await mm.parseFile(file);
    resolve(metadata)
  } catch (error) {
    reject(error.message)
  }
})

