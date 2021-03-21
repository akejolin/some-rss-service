/**
* @desc A super tiny fetch client service
* @param string $url - the url to fetch,
* @return object - the response object from fetch
*/

const fetch = require('node-fetch');

module.exports = (url) => new Promise((resolve, reject) => {
  fetch(url)
    .then(res => {
      if (res.ok) {
          return res
      } else {
        reject({
          code: res.status,
          message: res.statusText,
        })
      }
    })
    .then(res => {
      resolve(res)
    })
    .catch(err => {
      reject(err)
    })
})