export default function cardioReaderDirectiveFactory (ngComponent) {
  ngComponent.directive('cardioReader', cardioReader)

  function cardioReader (ENV, CardIOService, Utils) {
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
          Utils.logger.log('Can scan')
          element.bind('click', () => {
            scope.handler(CardIOService.scan())
          })
        }

        function isNotScanable () {
          Utils.logger.log('Can\'t scan')
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
