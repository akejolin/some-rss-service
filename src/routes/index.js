const feed = require('./feed')
const episode = require('./episode')

/**
* @desc Collects server routes.
* @return array
*/

module.exports = [
  feed,
  episode,
]