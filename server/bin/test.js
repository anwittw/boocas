const convert = require('xml-js')
const axios = require('axios')

axios
  .get(
    'https://www.goodreads.com/search/index.xml?key=wOQEN6JhV6JmUOAJqA3c9A&q=Harry%20Potter'
  )
  .then(response => {
    let xml = response.data
    let json = convert.xml2json(xml, { compact: true, spaces: 4 })
    console.log(json)
  })
  .catch(console.log)
