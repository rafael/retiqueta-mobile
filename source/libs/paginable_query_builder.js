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
      const start = (index === 1) ? '?' : '&'
      const encodeValues = current.map((value) => { return encodeURIComponent(value)})
      return prev + `${start}${encodeValues[0]}=${encodeValues[1]}`
    })
    .result()

  return result
}

export default UrlBuilder
