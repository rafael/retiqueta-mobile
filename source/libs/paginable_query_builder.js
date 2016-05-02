import _chain from 'pipeable'

function UrlBuilder (query = {}) {
  var result = _chain(query)
    .pipe(Object.assign, {
      page_number: 0,
      page_size: 15
    })
    .pipe(Object.keys)
    .pipe(Array.map, (key) => {
      return [key, query[key]]
    })
    .pipe((queries) => {
      return Array.concat([''], queries)
    })
    .pipe(Array.reduce, (prev, current, index, array) => {
      var start = (index === 1) ? '?' : '&'
      return prev + `${start}${current[0]}=${current[1]}`
    })
    .pipe((value) => {
      return value.replace(/\#/g,'')
    })
    .result()

  return result
}

export default UrlBuilder
