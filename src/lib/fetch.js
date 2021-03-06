/**
* @desc A super tiny fetch client service
* @param string $url - the url to fetch,
* @return object - the response object from fetch
*/

const fetch = require('node-fetch')

module.exports = (url, options={}) => new Promise((resolve, reject) => {
  fetch(url, options)
    .then(res => {
      if (res.ok) {
          return res
      } else {
        reject(res)
      }
    })
    .then(res => {
      resolve(res)
    })
    .catch(err => {
      reject(err)
    })
})
