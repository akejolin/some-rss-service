const get = require('lodash.get')

module.exports = (feed) => {

 /**
  * @desc Formatting and reducing the feed.
  * @param array $feed - the feed to format
  * @return array - success or failure
  */

  if (!Array.isArray(feed)) {
    throw new TypeError('Invalid feed param')
  }

 return feed.map((item) => ({
   title: get(item, 'title'),
   checksum: 'abc',
   file: get(item, 'enclosure.url'),
 }))
}