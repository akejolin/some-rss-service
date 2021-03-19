const get = require('lodash.get')

module.exports = (feed) => {

  /*
  * Parameters:
  * @feed: array
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