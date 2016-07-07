'use strict';

if (typeof window !== 'undefined') {
  (function () {
    if (!('serviceWorker' in navigator)) {
      console.error('Service worker not supported!');
      return;
    }

    navigator.serviceWorker.getRegistration()
      .then(function(worker) {
        console.info('Checking if worker is registered.');

        if (worker) {
          console.info('Worker registered under: ', worker);
          return worker;
        }

        return navigator.serviceWorker.register('cache_digests_http2_worker.js', { scope: '.' });
      })
      .then(function (worker) {
        console.log('Worker registration success: ', worker);
        return navigator.serviceWorker.ready;
      })
      .then(function () {
        console.info('Worker is controlled by: ', navigator.serviceWorker.controller);
      })
      .catch(console.error.bind(console));
    })
  ();
}
