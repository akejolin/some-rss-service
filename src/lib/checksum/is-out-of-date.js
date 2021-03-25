/**
* @desc CHeck if cached checksum is out of date
* @param string $url - fetched url
* @param date $date - fetched Date header value
* @param array $cache - cached checksum blob
* @return boolean (with promise)
*/

const crypto = require('crypto')

module.exports = (url, date, cache) => new Promise(async (resolve, reject) => {

  const getChecksum = (needle, cache) =>
    cache.find(haystack => haystack.url === needle)
  const hashedUrl = crypto.createHash('md5').update(url).digest("hex")
  const cachedChecksum = getChecksum(hashedUrl, cache)

  if (!cachedChecksum) {
    reject(true)
    return
  }

  let cachedDate = cachedChecksum.date
  let fetchDate = cachedChecksum.date
  try {
    cachedDate = new Date(cachedChecksum.date)
    fetchDate = new Date(date)
    resolve(fetchDate > cachedDate ? true : false)
  } catch(error) {
    throw new Error(error)
  }
})