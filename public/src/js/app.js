if('serviceWorker' in navigator){
    window.addEventListener('load', function() {
    navigator.serviceWorker
        .register('/service-worker.js',{ scope: './' })
        .then(function(reg){
            console.log('Registration succeeded... Scope is ' + reg.scope)
        }).catch(function(error) {
            console.log('Service worker registration error:', error)
        })
    })
} else {
  console.log('not supported')
}