/**
* @desc cron job entry.
* @return function - function to be executed by cron
*/

const get = require('lodash.get')
const shell = require('shelljs')

const log = require('../utils/system.log')
const feedFetch = require('../lib/feed.fetch')
const feedFormat = require('../lib/feed.format')
const startCreateCheckSumProgress = require('../cron/create-checksum')

module.exports = async () => {
  log.info('cron job get-episode-files started')

  const url = 'https://rss.acast.com/varvet' // Todo
  
  let feed = []

  // Get feed and parse

  try {
    feed = await feedFetch(url)
    feed = feed.map(item => ({file: get(item, 'enclosure.url', '')}))
  } catch(error) {
    throw new Error(`${error}`)
  }


  const action = (item) => new Promise((resolve, reject) => {

    // Slow down the loop process to not overload memory
    const delay = 0
    setTimeout(async () => {
      try {
        const res = await startCreateCheckSumProgress(item.file)
        resolve(res)
      } catch(error) {
        reject()
      }
    }, delay)
  })

  const result = await feed.reduce((accumulate, nextID) => {
    return accumulate.then(() => action(nextID))
  }, Promise.resolve())

  log.info('cron job get-episode-files done')
}