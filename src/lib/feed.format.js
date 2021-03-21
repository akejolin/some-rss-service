/**
* @desc Formatting and reducing the feed.
* @param array $feed - the feed to format
* @return array - success or failure
*/

const get = require('lodash.get')

module.exports = (feed) => {

  if (!Array.isArray(feed)) {
    throw new TypeError('Invalid feed param')
  }

 return feed.map((item) => ({
   title: get(item, 'title'),
   checksum: 'abc',
   file: get(item, 'enclosure.url', ''),
 }))
}