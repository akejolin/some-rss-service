/**
* @desc Test validation of parameter.
*/

jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox())
const fetchMock = require('node-fetch')

jest.mock('../lib/file.write-to-disk', () => () => Promise.reject({ data: {} }))
jest.mock('../lib/file.delete-from-disk', () => () => Promise.reject({ data: {} }))
jest.mock('../lib/file.get-info', () => () => Promise.reject({ data: {} }))

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
        url: '/episode',
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
        url: '/episode',
        host: 'localhost',
        query: {url: 'some.rss.feed'}
      },
    }
    await controller(mockCtx, jest.fn())

    expect(mockCtx.status).toEqual(400)
  })


  it('should respond with 400 when url is pointing towards a none mp3 file', async () => {

   fetchMock.get(
      'https://incorrect.file/type.jpeg',
      {
        status: 200,
        headers: {"Content-Type": "image/jpeg"}
      }
    )
    const mockCtx = {
      request: {
        url: '/episode',
        host: 'localhost',
        query: {url: 'https://incorrect.file/type.jpeg'}
      },
    }
    await controller(mockCtx, jest.fn())

    expect(mockCtx.status).toEqual(401)
  })

  it('should respond with 404 when file fetch is responding with status 404, not found', async () => {

   fetchMock.get(
      'https://not.found.file/request.mp3',
      {
        status: 404,
      }
    )
    const mockCtx = {
      request: {
        url: '/episode',
        host: 'localhost',
        query: {url: 'https://not.found.file/request.mp3'}
      },
    }
    await controller(mockCtx, jest.fn())

    expect(mockCtx.status).toEqual(404)
  })

  it('should respond with 500 when file file.write-to-disk fails', async () => {

    fetchMock.get(
      'https://correct.file/type.mp3',
      {
        status: 200,
        headers: {"Content-Type": "audio/mpeg"},
        body: jest.fn()
      }
    )
    
    const mockCtx = {
      request: {
        url: '/episode',
        host: 'localhost',
        query: {url: 'https://correct.file/type.mp3'}
      },
    }
    await controller(mockCtx, jest.fn())

    expect(mockCtx.status).toEqual(500)
  })

})
