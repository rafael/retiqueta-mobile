import _chain from 'pipeable'
import clone from 'clone'

function jsonapi (data, included = data.included, meta = data.meta) {
  if ( data === null || typeof data === 'undefined') {
    return data
  }
  
  let result = clone(data)

  try {
    if (result.hasOwnProperty('data')) {
      result = extractJsonApi(result.data, included, meta)
    } else {
      result = extractJsonApi(result, included, meta)
    }
  } catch(e) {
    console.log(e)
    console.log(result)
  }

  return result
}

function extractJsonApi (data, included, meta) {
  if (Array.isArray(data)) {
    return data.map((item, index) => {
      return ParseItem(item, index, data, included, meta)
    })
  } else {
    return ParseItem(data, 0, data, included, meta)
  }
}

function ParseItem (item, index, array, included, meta) {
  var relationTypes = (item.hasOwnProperty('relationships')) ? Object.keys(item.relationships) : []
  var relationIsArray = false

  relationTypes.forEach(relation => {
    _chain(item.relationships[relation])
    .pipe(relationItem => {
      relationItem = (relationItem.hasOwnProperty('data')) ? relationItem.data : relationItem
      relationIsArray = Array.isArray(relationItem)
      return processItemRelationData(relationItem, relationIsArray, included, relation)
    })
    .pipe(Array.filter, x => {
      return typeof x !== 'undefined'
    })
    .pipe(selectData, relationIsArray)
    .pipe(newItem => {
      if (newItem !== null) {
        item.relationships[relation] = jsonapi(newItem, included)
      } else {
        item.relationships[relation] = item.relationships[relation].data
      }
    })
  })
  
  if (array.hasOwnProperty('meta') && typeof item.meta === 'undefined') {
    item.meta = array.meta
  } else if (typeof item.meta === 'undefined') {
    item.meta = meta
  }

  return item
}

function hasRelationship (relation) {
  if (Array.isArray(relation)) {
    return relation.reduce((result, item) => {
      return result && hasRelationship(item)
    }, false)
  } else {
    return relation.hasOwnProperty('relationships')
  }
}

function FindInclude (data = [], item, type) {
  return data.filter(x => {
    return x.id === item.id && x.type === item.type
  }).shift()
}

function selectData (newItem, relationIsArray) {
  if (relationIsArray) {
    return (newItem.length > 0) ? newItem : null
  } else {
    return (typeof newItem[0] !== 'undefined') ? newItem[0] : null
  }
}

function processItemRelationData (relationItem, relationIsArray, included, relation) {
  if (relationItem === null) {
    return []
  }
  if (relationIsArray) {
    return relationItem.map(x => {
      return FindInclude(included, x, relation)
    })
  } else {
    return [FindInclude(included, relationItem, relation)]
  }
}

export default jsonapi
