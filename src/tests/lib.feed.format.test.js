const feedFormat = require('../lib/feed.format')

describe('feedFormat', () => {


  const feed = [
    {
      title: "Some title",
      link: "https://play.acast.com/s/varvet/kortversion-459-happyjankell",
      pubDate: "Tue, 16 Mar 2021 02:00:00 GMT",
      enclosure: {
        url: "https://some.url.to/media.mp3",
        length: "11111111",
        type: "audio/mpeg"
      },
      content: "Some content...",
      contentSnippet: "Some code snippet",
      guid: "abcabcabcacb",
      isoDate: "2021-03-16T02:00:00.000Z",
      itunes: {
        subtitle: "Some content...",
        summary: "Some summary...",
        explicit: "no",
        duration: "00:00:01",
        image: "https://some.path.to/image.png",
        keywords: ""
      }
    },
  ]

  it('should format results in a certain way', async() => {
    result = feedFormat(feed)
    expect(result).toEqual([
      {
        title: "Some title",
        file: "https://some.url.to/media.mp3",
        checksum: 'abc'
      }
    ])
  })

  it('should throw type error when input is not an array', async() => {
    expect(() => {
      feedFormat({invalid: true})
    }).toThrow('Invalid feed param')
  })


})
