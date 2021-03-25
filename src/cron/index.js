/**
* @desc Sets load order of cron jobs.
* @return array
*/
const CronJob = require('cron').CronJob

const getEpisodeFiles = require('./get-feed')



module.exports = [
  new CronJob('*/10 * * * *', getEpisodeFiles, null, true, 'Europe/Stockholm', null, true)
]