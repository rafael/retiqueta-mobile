export default function linkifyFactory (ngComponent) {

  //  ngComponent.directive('nglinkify', linkify)
  ngComponent.filter('linkify', function($sce) {
    return function(value, type) {
      return $sce.trustAsHtml(formatAnchor(value, '#/users/search/products'));
    }
  })

//   function linkify () {
//     return {
//       restrict: 'A',
//       require: 'ngModel',
//       link(scope, element, attrs) {
//         ngModel.$setViewValue(formatAnchor(ngModel.$viewValue));
//         ngModel.$render();
//       },
//     }
//   }
// 
  function formatAnchor(text, uiTarget) {
    var replacedText = '' 

    // replace #hashtags and send them to twitter
    var replacePattern1 = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;
    replacedText = text.replace(replacePattern1, '$1<a href="' + uiTarget + '/$2">#$2</a>');
    
    // replace @mentions but keep them to our site
    var replacePattern2 = /(^|\s)\@(\w*[a-zA-Z_]+\w*)/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="' + uiTarget + '/$2" >@$2</a>');
    
    return replacedText;
  }
}

