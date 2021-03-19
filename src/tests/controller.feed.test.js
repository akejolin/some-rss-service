/**
* @desc Test validation of parameter.
*/

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
})
