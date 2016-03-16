export default function cardioReaderDirectiveFactory (ngComponent) {
  ngComponent.directive('cardioReader', cardioReader)

  function cardioReader (CardIOService) {
    return {
      restrict: 'A',
      scope: {
        scanOptions: '@',
        always: '@',
        handler: '='
      },
      link (scope, element, attrs) {
        console.log('directive load')

        if (scope.always !== true) {
          CardIOService.canScan()
          .then(isScanable)
          .catch(isNotScanable)
        } else {
          isScanable()
        }

        function isScanable () {
          element.bind('click', () => {
            scope.handler(CardIOService.scan())
          })
        }

        function isNotScanable () {
          element.addClass('ng-hide')
        }

      }
    }
  }
}
