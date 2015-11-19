import _chain from 'pipeable'

function jsonapi (result) {
  if(result.data.length > 0) {
    result.data = result.data.map((item, index) => {
      return ParseItem(item, index, result)
    })
  }
  return result
}

function ParseItem (item, index, array) {
  var relationTypes = (item.hasOwnProperty('relationships')) ? Object.keys(item.relationships) : null

  if(relationTypes !== null) {
    _chain(relationTypes)
    .pipe(Array.forEach, (relation) => {
      _chain(item.relationships[relation].data)
      .pipe(Array.map, (x) => {
        return FindInclude(array.included, x, relation)
      })
      .pipe((newItem) => {
        item.relationships[relation] = newItem
      })
    })
  }

  return item
}

function FindInclude (data = [], item, type) {
  return data.filter((x) => {
    return x.id === item.id && x.type === item.type
  }).shift()
}

export default jsonapi
