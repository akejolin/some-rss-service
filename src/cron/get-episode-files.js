/**
* @desc cron job.
* @return function - function to be executed by cron
*/

const get = require('lodash.get')
const shell = require('shelljs')

const log = require('../utils/system.log')
const feedFetch = require('../lib/feed.fetch')
const feedFormat = require('../lib/feed.format')
const startCreateCheckSumProgress = require('../lib/checksum/progress')

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
  /*

  
  const feed = [
    {
      title: 'KORT VERSION #460: Johan Croneman',
      checksum: 'abc',
      file: 'https://sphinx.acast.com/varvet/9721eae6-9ef5-4e68-bf43-8afab89989d2/media.mp3'
    },
    {
      title: '#460: Johan Croneman',
      checksum: 'abc',
      file: 'https://sphinx.acast.com/varvet/-460-johancroneman/media.mp3'
    },
    {
      title: 'KORT VERSION #459: Happy Jankell',
      checksum: 'abc',
      file: 'https://sphinx.acast.com/varvet/kortversion-459-happyjankell/media.mp3'
    },
    {
      title: '#459: Happy Jankell',
      checksum: 'abc',
      file: 'https://sphinx.acast.com/varvet/-459-happyjankell/media.mp3'
    },
    {
      title: 'KORT VERSION #458: Alexander Karim',
      checksum: 'abc',
      file: 'https://sphinx.acast.com/varvet/kortversion-458-alexanderkarim/media.mp3'
    },
  ]
  */


  const action = (item) => new Promise((resolve, reject) => {

    // Slow down the loop process to not overload memory
    setTimeout(async () => {
      try {
        const res = await startCreateCheckSumProgress(item.file)
        resolve(res)
      } catch(error) {
        reject()
      }
    }, 300)
  })

  const result = await feed.reduce((accumulate, nextID) => {
    return accumulate.then(() => action(nextID))
  }, Promise.resolve())

  log.info('cron job get-episode-files done')
}