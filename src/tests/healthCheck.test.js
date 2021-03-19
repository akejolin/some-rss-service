const healthCheckMiddleware = require('../middlewares/healthcheck')

describe('healthCheck', () => {
  it('should respond 204 on a health check request', () => {
    const mockCtx = {
      request: {
        url: '/healthcheck',
        host: 'localhost',
      },
    }
    healthCheckMiddleware(mockCtx, jest.fn())

    expect(mockCtx.status).toEqual(204)
  })
})
