/**
* @desc Test to write cache file.
*/
const shell = require('shelljs')
const path = require('path')
const fs = require('fs')
const createCacheFile = require('./create-cache-file')

createCacheFile('mock-cache', 'test-cache-file.json', {hello: 'world!'})

const diskPath = path.resolve('.', 'mock-cache')

describe('createCacheFile', () => {
  it('should extract an extension of an string url', async () => {
    await fs.readFile(`${diskPath}/test-cache-file.json`, 'utf8', (err, data) => {
      expect(data).toEqual('{"hello":"world!"}')
      shell.rm('-fr', diskPath)
    })
  })
})
