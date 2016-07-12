export default function (ngComponent) { 
  ngComponent.factory('ImageSizeInterceptor', ImageSizeInterceptor)
  ngComponent.config(ConfigImageSizeInterceptor)
  
  function ImageSizeInterceptor ($rootScope, $q) {
    return {
      request: function (config) {
        config.headers = config.headers || {}
        config.headers['image-size'] = 'large' 

        return config
      }
    }
  }

  function ConfigImageSizeInterceptor ($httpProvider) {
    $httpProvider.interceptors.push('ImageSizeInterceptor')
  }
  
}
