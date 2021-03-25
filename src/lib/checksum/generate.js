/**
* @desc write a fetched file to disk.
* @param object $fetchResponse - the response object from fetch,
* @param string $url - the fetched url,
* @return object - file object with
*/

const fs = require('fs');
const crypto = require('crypto');
module.exports = ({file, url}) => new Promise(async (resolve, reject) => {

  const generateChecksum = (str, algorithm, encoding) => crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex')


  try {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err)
      }
      const checksum = generateChecksum(data)
      resolve({
        checksum,
        url
      })
    })
  } catch(error) {
      reject(error)
  }
})

