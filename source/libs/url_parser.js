function ifNotEmpty (variable) {
  return typeof variable !== 'undefined' && variable !== null && variable !== '' && typeof variable === 'string'
}

function extractQuery (url) {
  return url.slice(1).split('&').reduce((result, query, index) => {
    let [variable, value] = query.split('=')
    if  (ifNotEmpty(variable)) {
      result[variable] = value
    }
    return result
  }, {})
}

function extractVariables (url, pattern) {
  let regPattern = getPattern(pattern)
  let matchedUrl = url.match(regPattern) || []
  let patternVariables = getVariables(pattern)

  return matchedUrl.slice(1).reduce((result, match, index) => {
    result[patternVariables[index]] = match
    return result
  }, {})
}

function getPattern (patternString) {
  let pattern = patternString.replace(/\:[a-zA-z0-9]*/g, `([a-zA-Z0-9-]*)`) + '(?=\\?|$)'
  return new RegExp(pattern, 'i')
}

function getVariables (pattern) {
  let matches = pattern.match(/\:([a-zA-Z0-9]*)/g) || []
  return matches.map(match => { return match.replace(/\:/, '') })
}

function getLocation (href) {
  var l = document.createElement("a");
  l.href = href;
  return l;
};

function match (pattern, url) {
  const regexPattern = getPattern(pattern)
  const result = url.match(regexPattern)

  return result !== null
}

function processUrl (pattern, url) {
  return {
    ...extractQuery(url.search),
    ...extractVariables (url.href, pattern)
  }
}

// Public Functions

function Parser (payload) {
  const urlObj = getLocation(payload.url)
  let defaultPattern = ''
  return {
    match (pattern) {
      defaultPattern = pattern
      return match(defaultPattern, payload.url)
    },
    processUrl () {
      return processUrl(defaultPattern, urlObj)
    }
  }
}


export default Parser
