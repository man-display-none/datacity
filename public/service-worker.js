self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open('test')
      .then(cache => {
        return cache.addAll([
          'bundle.js',
          'bundle.js.map',
          'style.css',
          'index.html'
        ])
      })
      .catch(error => {
        console.log(error)
      })
  )
})

self.addEventListener('activate', event => {
  console.log('Service worker activating...', event)
})

self.addEventListener('fetch', event => {
  fetch(event.request.url)
    .then(cache => {
      console.log(cache)
    })
    .catch(error => {
      console.log(error)
    })
})
