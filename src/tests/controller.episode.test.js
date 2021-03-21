/**
* @desc Test validation of parameter.
*/

jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox())
const fetchMock = require('node-fetch')

const controller = require('../controllers/episode')

describe('episode controller', () => {
  it('should respond with 400 when url param is missing', async () => {
    const mockCtx = {
      request: {
        url: '/episode',
        host: 'localhost',
      },
    }
    await controller(mockCtx, jest.fn())

    expect(mockCtx.status).toEqual(400)
  })

  it('should respond with 400 when url param is existing but empty', async () => {
    const mockCtx = {
      request: {
        url: '/feed',
        host: 'localhost',
        query: {url: ''}
      },
    }
    await controller(mockCtx, jest.fn())

    expect(mockCtx.status).toEqual(400)
  })

  it('should respond with 400 when url param is existing but invalid', async () => {
    const mockCtx = {
      request: {
        url: '/feed',
        host: 'localhost',
        query: {url: 'some.rss.feed'}
      },
    }
    await controller(mockCtx, jest.fn())

    expect(mockCtx.status).toEqual(400)
  })


  it('should respond with 400 when url is pointing towards a none mp3 file', async () => {

    jest.mock('../lib/file.write-to-disk')
    jest.mock('../lib/file.delete-from-disk')
    jest.mock('../lib/file.get-info')

   fetchMock.get(
      'https://incorrect.file/type.jpeg',
      {
        status: 200,
        headers: {"Content-Type": "image/jpeg"}
      }
    )

    const mockCtx = {
      request: {
        url: '/feed',
        host: 'localhost',
        query: {url: 'https://incorrect.file/type.jpeg'}
      },
    }
    await controller(mockCtx, jest.fn())

    expect(mockCtx.status).toEqual(401)
  })

})
