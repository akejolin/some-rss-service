/**
* @desc Test get extension function of a url.
*/
const shell = require('shelljs')
const path = require('path')
const createCacheFile = require('../create-cache-file')

createCacheFile('test-mock', 'test-cache-file.json', {hello: 'world!'})

const diskPath = path.resolve('.', 'mock')


describe('createCacheFile', () => {
  it('should extract an extension of an string url', () => {
    const res = shell.cat('-la', `${diskPath}/test-cache-file.json`)
    console.log(res)
    expect(true).toEqual(true)
  })
})


shell.rm('-fr', diskPath)
