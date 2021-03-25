/* eslint-disable jest/expect-expect, jest/no-done-callback */

const request = require('supertest')

jest.mock('../lib/checksum/load-cache', () => () => ([]))
jest.mock('../lib/feed.fetch', () => () => ([]))

describe('server', () => {
  let server = null

  beforeEach(() => {
    server = require('../server.api')
  })

  afterEach(() => {
    server.close()
  })

  it('should respond 200 on a feed request', (status) => {
    request(server)
      .get('/feed?url=https://rss.acast.com/varvet')
      .expect(200, status)
  })

  it('should respond 200 on an other feed request', (status) => {
    request(server)
      .get('/feed?url=https://www.reddit.com/.rss')
      .expect(200, status)
  })
})
