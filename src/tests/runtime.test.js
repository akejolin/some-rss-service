const request = require('supertest')

describe('server', () => {
  let server = null

  beforeEach(() => {
    server = require('../server')
  })

  afterEach(() => {
    server.close()
  })

  it('should respond 200 on a feed request', (status) => {
    request(server)
      .get('/feed?url=https://rss.acast.com/varvet')
      .expect(200, status)
  })

  it('should respond 200 on a feed request', (status) => {
    request(server)
      .get('/feed?url=https://www.reddit.com/.rss')
      .expect(200, status)
  })
})
