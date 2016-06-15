export default function (ngComponent) {
  ngComponent.run(configureFormForValidationErrors)

  function configureFormForValidationErrors ($translate, FormForConfiguration) {
    $translate.onReady(() => {
      FormForConfiguration.setValidationFailedForMaxLengthMessage(
        $translate.instant('FORM_MAX_LENGTH_ERROR', { num: '{{num}}'})
      )
      FormForConfiguration.setValidationFailedForMinLengthMessage(
        $translate.instant('FORM_MIN_LENGTH_ERROR', { num: '{{num}}'})
      )
      FormForConfiguration.setValidationFailedForMaximumMessage(
        $translate.instant('FORM_MAX_NUMBER_ERROR' , { num: '{{num}}'})
      )
      FormForConfiguration.setValidationFailedForMinimumMessage(
        $translate.instant('FORM_MAX_LENGTH_ERROR', { num: '{{num}}'})
      )
      FormForConfiguration.setValidationFailedForRequiredMessage(
        $translate.instant('FORM_REQUIRED_ERROR' , { num: '{{num}}'})
      )
      FormForConfiguration.setValidationFailedForEmailTypeMessage(
        $translate.instant('FORM_EMAIL_ERROR', { num: '{{num}}'})
      )
      FormForConfiguration.setValidationFailedForPatternMessage(
        $translate.instant('FORM_INVALID_FORMAT_ERROR', { num: '{{num}}'})
      )
    })
  }
}
