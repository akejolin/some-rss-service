/**
* @desc Test cron entry.
*/
const shell = require('shelljs')
const path = require('path')
const createCacheFile = require('./create-cache-file')

createCacheFile('mock', 'test-cache-file.json', {hello: 'world!'})

const diskPath = path.resolve('.', 'mock')

describe('createCacheFile', () => {
  it('should extract an extension of an string url', async () => {
    await fs.readFile(`${diskPath}/test-cache-file.json`, 'utf8', (err, data) => {
      expect(data).toEqual('{"hello":"world!"}')
      shell.rm('-fr', diskPath)
    })
  })
})