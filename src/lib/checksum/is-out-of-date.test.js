/**
* @desc Test function to check if checksum cache is out of date
*/

const isOutOfDate = require('./is-out-of-date')

describe('isOutOfDate', () => {

  let cache = [
    {
      checksum: "abc-acb-acb-acb-",
      url:"67336d38e70720322da9762466b482ab",
      date:"Wed, 24 Mar 2021 13:56:43 GMT"
    }
  ]


  it('should return true when checksum cache date is out of date', async() => {
    try {
      const cacheIsOutOfDate = await isOutOfDate(
        'https://some.url.to/media.mp3',
        'Thu, 25 Mar 2021 13:56:43 GMT',
        cache
      )
      expect(cacheIsOutOfDate).toEqual(true)
    } catch(error) {
      log.error(`checksum is not cached`)
    }
  })

  it('should return false when checksum cache date is not out of date', async() => {
    try {
      const cacheIsOutOfDate = await isOutOfDate(
        'https://some.url.to/media.mp3',
        'Wed, 24 Mar 2021 13:56:43 GMT',
        cache
      )
      expect(cacheIsOutOfDate).toEqual(false)
    } catch(error) {
      log.error(`checksum is not cached`)
    }
  })



})
