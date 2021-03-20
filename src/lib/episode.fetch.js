const fetch = require('node-fetch')
const get = require('lodash.get')
const log = require('../utils/system.log')


/**
* @desc Fetching a rss feed and parse it into js object.
* @param string $url - the url to fetch
* @return array - success or failure
*/

module.exports = (url, dataNeedle='items') => new Promise(async (resolve, reject) => {

  const mm = require('music-metadata');
const util = require('util');

(async () => {
  try {
    const metadata = await mm.parseFile(url);
    console.log(util.inspect(metadata, { showHidden: false, depth: null }));
    resolve()
  } catch (error) {
    reject({
      code: 404,
      message: error.message
    })
  }
})()



})