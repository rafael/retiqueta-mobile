import _chain from 'pipeable'
import clone from 'clone'

function jsonapi (data) {
  let result = clone(data)
  
  if(result.data.length > 0) {
    result.data = result.data.map((item, index) => {
      return ParseItem(item, index, result)
    })
  }

  return result
}

function ParseItem (item, index, array) {
  
  var relationTypes = (item.hasOwnProperty('relationships')) ? Object.keys(item.relationships) : null
  var relationIsArray = false

  if (relationTypes !== null) {
    _chain(relationTypes)
    .pipe(Array.forEach, (relation) => {
      _chain(item.relationships[relation].data)
      .pipe(relationItem => {
        relationIsArray = Array.isArray(relationItem)
        return processItemRelationData(relationItem, relationIsArray, array, relation)
      })
      .pipe(Array.filter, x => {
        return typeof x !== 'undefined'
      })
      .pipe( data => {
        return selectData(data, relationIsArray)
      })
      .pipe(newItem => {
        if (newItem !== null) {
          item.relationships[relation] = newItem
        } else {
          item.relationships[relation] = item.relationships[relation].data
        }  
      })
    })
  }

  return item
}

function FindInclude (data = [], item, type) {
  return data.filter(x => {
    return x.id === item.id && x.type === item.type
  }).shift()
}

function selectData( newItem, relationIsArray ) {
  if (newItem.length === 0 ) { return null } 

  if(relationIsArray) {
    return (newItem.length > 0) ? newItem : null
  } else {
    return (typeof newItem[0] !== 'undefined') ? newItem[0] : null
  }
}


function processItemRelationData (relationItem, relationIsArray, array, relation) {
  if (relationItem === null ) { return []}


  if (relationIsArray) {
    return relationItem.map( x => {
      return FindInclude(array.included, x, relation)
    })
  } else {
    return [FindInclude(array.included, relationItem, relation)]
  }

}

export default jsonapi
