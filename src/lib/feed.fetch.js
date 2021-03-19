const Parser = require('rss-parser')
const get = require('lodash.get')
const log = require('../utils/log')

/**
* ToDo: I will not do checksum in this exercise. That's because I think it would
* violate and put performance or memory at risk.
* Suggestion: Let the feed be downloaded via startup and then also cron which would
* download and create checksum of every downloaded file. Final result could be stored
* in a list in a file on disk or db containing a blob of unique file hash and file path.
* When user hits the end point, the system could match if filepaths in the feed result
* exists in the file and then attach the checksum to the final result.
*/

/**
* @desc Fetching a rss feed and parse it into js object.
* @param string $url - the url to fetch
* @return array - success or failure
*/

module.exports = (url, dataNeedle='items') => new Promise(async (resolve, reject) => {

  // Get feed and parse
  let parser = new Parser()

  try {
    let result = await parser.parseURL(url)
    // Make sure result will always be an array
    result = get(result, dataNeedle, [])
    resolve(result)
  } catch(error) {
    log.log(error)
    if (`${error}`.indexOf('Status code 404') > -1) {
      reject({
        code: 404,
        message: 'Feed not found'
      })
    } else {
      reject({
        code: 400,
        message: 'Parse error'
      })
    }
  }
})