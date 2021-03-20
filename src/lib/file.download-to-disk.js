fs = require('fs')
const shell = require('shelljs')
const path = require('path')
const fetch = require('node-fetch')
const log = require('../utils/system.log')
//const md5File = require('md5-file')
//const crypto = require('crypto');

let Parser = require('rss-parser')
let parser = new Parser()
const isEmpty = require('lodash.isempty')


const extractExtention = require('../utils/extractExtention')

const download = async (remoteFiles) => {

const _libPath = 'bin'
const libPath = path.resolve('.', _libPath)
if (!fs.existsSync(libPath)) {
  shell.mkdir('-p', libPath)
}
const downloaded = []

// 1. Download

let promises = remoteFiles.map(file => new Promise( async (resolve, reject) => {

  let res = null
  const url = file.url

  try {
    res = await fetch(url)
  } catch(err){
    log.log(err)
    reject(err)
    return
  }

  let destDir = path.resolve('.', `${_libPath}`)

  if (!fs.existsSync(destDir)) {
    shell.mkdir('-p', destDir)
  }

  const fileName = crypto.createHash('md5').update(url).digest("hex");
  const ext = extractExtention(file.url)
  const fullFilePath = `${destDir}/${fileName}.${ext}`
  const dest = fs.createWriteStream(fullFilePath)
  dest.on('finish', () => {
    resolve()
  })
  try {
    await res.body.pipe(dest)
  } catch(err) {
    console.log(err)
    reject(err)
  }
  downloaded.push({file: fullFilePath, url})
}))

await Promise.all(promises)

console.log('All files downloaded')

// 2. Create hashes

let hashes = downloaded.map(file => new Promise( async (resolve, reject) => {
  md5File(file.file).then((hash) => {
    resolve({file: file.file, hash, url: file.url})
  })
}))

hashes = await Promise.all(hashes)
console.log('hashes: ', hashes )



// 3. Save list

let fileHashRecord = path.resolve('.', `bin`, 'file-hash-record.json')
await fs.writeFile(fileHashRecord, JSON.stringify(downloaded), () => {})

console.log('file hash record completed')

}
module.exports = download



const getFeed = (url) => new Promise( async (resolve, reject) => {
  let feed = null
  try {
    feed = await parser.parseURL(url)
  } catch(err) {
    reject([])
  }

  if (isEmpty(feed.items)) {
    reject([])
  }

  resolve(
    feed.items.map(item => ({
      url: item.enclosure.url,
    }))
  )
})


const feed = [
  { url: 'https://sphinx.acast.com/varvet/kortversion-459-happyjankell/media.mp3'},
  { url: 'https://sphinx.acast.com/varvet/-459-happyjankell/media.mp3'},
]

const run = async () => {
  const feed = await getFeed('https://rss.acast.com/varvet')

  console.log(feed)
  download(feed)
}
run()

