import _chain from 'pipeable'
import clone from 'clone'

function jsonapi (data, included = data.included) {
  if ( data === null || typeof data === 'undefined') {
    return data
  }

  let result = clone(data)

  try {
    if (result.hasOwnProperty('data')) {
      result = extractJsonApi(result.data, included)
    } else {
      result = extractJsonApi(result, included)
    }
  } catch(e) {
    console.log(e)
    console.log(result)
  }

  return result
}

function extractJsonApi (data, included) {
  if (Array.isArray(data)) {
    return data.map((item, index) => {
      return ParseItem(item, index, data, included)
    })
  } else {
    return ParseItem(data, 0, data, included)
  }
}

function ParseItem (item, index, array, included) {
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

  if (array.hasOwnProperty('meta')) {
    item.meta = array.meta
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
