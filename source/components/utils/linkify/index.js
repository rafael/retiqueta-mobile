export default function linkifyFilterFactory (ngComponent) {
  ngComponent.filter('linkify', linkify)

  function linkify ($sce) {
    return (value, type) => {
      return $sce.trustAsHtml(formatAnchor(value, '#/users/search/products'))
    }
  }

  function formatAnchor (text, uiTarget) {
    var replacedText = ''

    // replace #hashtags and send them to twitter
    var replacePattern1 = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim
    replacedText = text.replace(replacePattern1, '$1<a href="' + uiTarget + '/$2">#$2</a>')

    // replace @mentions but keep them to our site
    var replacePattern2 = /(^|\s)\@(\w*[a-zA-Z_]+\w*)/gim
    replacedText = replacedText.replace(replacePattern2, '$1<a href="' + uiTarget + '/$2" >@$2</a>')

    return replacedText
  }
}
