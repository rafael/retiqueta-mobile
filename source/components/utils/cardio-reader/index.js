export default function cardioReaderDirectiveFactory (ngComponent) {
  ngComponent.directive('cardioReader', cardioReader)

  function cardioReader (ENV, CardIOService) {
    return {
      restrict: 'A',
      scope: {
        scanOptions: '@',
        always: '@',
        handler: '='
      },
      link (scope, element, attrs) {
        let tries = 0

        function canScan () {
          if (scope.always !== true) {
            CardIOService.canScan()
            .then(isScanable)
            .catch(isNotScanable)
          } else {
            isScanable()
          }
        }

        function isScanable () {
          if (ENV.isDevelopment()) {
            console.log('Can scan')
          }
          element.bind('click', () => {
            scope.handler(CardIOService.scan())
          })
        }

        function isNotScanable () {
          if (ENV.isDevelopment()) {
            console.log('Can\'t scan')
          }

          if (tries < 2) {
            tries += 1
            canScan()
          }
          element.addClass('ng-hide')
        }
        
        canScan()
      }
    }
  }
}
