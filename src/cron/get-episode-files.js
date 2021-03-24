/**
* @desc cron job.
* @return function - function to be executed by cron
*/

const feedFetch = require('../lib/feed.fetch')
const feedFormat = require('../lib/feed.format')

module.exports = async () => {
console.log('this fn was exe by cron')
}