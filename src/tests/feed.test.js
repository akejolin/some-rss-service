const controller = require('../controllers/feed')

describe('feed controller should respond with 400', () => {
  it('when url param is missing', async () => {
    const mockCtx = {
      request: {
        url: '/feed',
        host: 'localhost',
      },
    }
    await controller(mockCtx, jest.fn())

    expect(mockCtx.status).toEqual(400)
  })
})

describe('feed controller should respond with 400', () => {
  it('when url param is existing but empty', async () => {
    const mockCtx = {
      request: {
        url: '/feed',
        host: 'localhost',
        query: {url: ''}
      },
    }
    await  controller(mockCtx, jest.fn())

    expect(mockCtx.status).toEqual(400)
  })
})

describe('feed controller should respond with 400', () => {
  it('when url param is existing but invalid', async () => {
    const mockCtx = {
      request: {
        url: '/feed',
        host: 'localhost',
        query: {url: 'some.rss.feed'}
      },
    }
    await  controller(mockCtx, jest.fn())

    expect(mockCtx.status).toEqual(400)
  })
})

describe('feed controller should respond with 200', () => {
  jest.mock('rss-parser', () => jest.fn())
  it('when url param is existing', async () => {
    const mockCtx = {
      request: {
        url: '/feed',
        host: 'localhost',
        query: {url: 'https://some.rss.feed'}
      },
    }
    await  controller(mockCtx, jest.fn())

    expect(mockCtx.status).toEqual(200)
  })
})
