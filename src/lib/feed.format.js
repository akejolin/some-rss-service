/**
* @desc Formatting and reducing the feed.
* @param array $feed - the feed to format
* @param array $cache - cached checksum objects
* @return array - success or failure
*/

const get = require('lodash.get')
const crypto = require('crypto')


const getChecksum = (url, cache) => {
  const needle = crypto.createHash('md5').update(url).digest("hex")
  const result = cache.find(haystack => haystack.url === needle)
  return result ? result.checksum : 'not available'
}

module.exports = (feed, cache=[]) => {

  if (!Array.isArray(feed)) {
    throw new TypeError('Invalid feed param')
  }


  return feed.map((item) => {
    const file = get(item, 'enclosure.url', '')
    return {
    title: get(item, 'title'),
    checksum: getChecksum(file, cache),
    file,
 }}
 )
}