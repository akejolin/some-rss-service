const mm = require('music-metadata')

module.exports = (file) => new Promise(async (resolve, reject) => {

  try {
    const metadata = await mm.parseFile(file);
    resolve(metadata)
  } catch (error) {
    reject({
      code: 500,
      message: error,
    })
  }
})

