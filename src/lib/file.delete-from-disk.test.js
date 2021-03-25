/**
* @desc Test delete function to delete a file from disk during run time on server.
*/

const path = require('path')
const createCacheFile = require('./checksum/create-cache-file')
const fileDelete = require('./file.delete-from-disk')

describe('file-delete-from-disk', () => {

  const filePath = path.resolve('.', 'mock-cache/delete-me.json')

  // Lets delete it and see what happens
  it('should successfully delete a file from disk', async () => {

    // create a file
    await createCacheFile('mock-cache', 'delete-me.json', {good: 'bye!'})


    // and now delete same file
    let result = null
    try {
      result = await fileDelete(filePath)
    } catch(error) {
      result = error
    }
    expect(result).toEqual('file successfully deleted')
  })

  // Now, file should be deleted.
  // Let´s run again and hopefully it fails.
  it('should successfully delete a file from disk', async () => {
    try {
      result = await fileDelete(filePath)
    } catch(error) {
      result = error
    }
    expect(result).toEqual({
      code: 500,
      message: 'File to delete does not exist',
    })
  })
})


