/**
* @desc Test validation of parameter.
*/

jest.mock('../lib/feed.fetch', () => () => Promise.reject({code: 404, message: 'not found'}))

const controller = require('../controllers/feed')

describe('feed controller', () => {
  it('should respond with 400 when url param is missing', async () => {
    const mockCtx = {
      request: {
        url: '/feed',
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
        query: { url: '' }
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
        query: { url: 'some.rss.feed' }
      },
    }
    await controller(mockCtx, jest.fn())

    expect(mockCtx.status).toEqual(400)
  })

  it('should respond with 404 when rss-parser returns status 404', async () => {

    const mockCtx = {
      request: {
        url: '/feed',
        host: 'localhost',
        query: { url: 'https://not.found.com' }
      },
    }
    try {
      await controller(mockCtx, jest.fn())
    } catch(error) {
      console.log(error)
    }
    

    expect(mockCtx.status).toEqual(404)
  })

})
