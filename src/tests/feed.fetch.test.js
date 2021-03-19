
const Parser = require('rss-parser')

jest.mock('rss-parser')

const feedFetch = require('../lib/feed.fetch')


describe('feedFetch', () => {

  const url = 'https://some.rss.feed'

  beforeEach(() => {
    Parser.mockClear()
  })

  it('should have been called once', async() => {
    feed = await feedFetch(url)
    expect(Parser).toHaveBeenCalledTimes(1)
  })

  it('should return an array containing some valid data', async () => {
    Parser.mockImplementation(() => {
      return {
        parseURL: () => ({
          items: [
          {
            title: 'A new episode',
            checksum: 'abc',
            file: 'https://some.path.to/file.mp3',
          },
          {
            title: 'Next episode',
            checksum: 'def',
            file: 'https://some.path.to/next/file.mp3',
          },
        ]}),
      }
    })

    const result = await feedFetch(url)
    expect(Array.isArray(result)).toEqual(true)
    expect(result[0].title).toEqual('A new episode')
  })

})
