/**
* @desc Extract content info of mp3 file
* @param string $file - full file path on disk,
* @return object - metadata
*/

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

