'use strict';

// https://github.com/HenrikJoreteg/appcache-serviceworker-generator

var appCache = window.applicationCache;


// use  the serviceworker if provided
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker
//         .register('./sw.js')
//         .then(function (registration) {
//             // Registration was successful
//             console.log('ServiceWorker registration successful with scope: ', registration.scope);
//         }).catch(function (err) {
//             // registration failed :(
//             console.log('ServiceWorker registration failed: ', err);
//         });
// // else switch to manifest.appcache
// } else 
if (appCache) {
    appCache.onupdateready = function () {
        if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
            // Browser downloaded a new app cache.
            /* eslint-disable no-alert*/
            if (confirm('A new version of this App is available. Do you want to download it?')) {
                window.location.reload();
            }
            /* eslint-enable no-alert */
        }
    };

    appCache.onobsolete = function() {
        appCache.update();
    };

    // var displayStatus = document.querySelector('#online-status');
    // if (displayStatus) {
    //     // Using this, since navigator.onLine is very inconcistent and unreliable
    //     appCache.onerror = function () {
    //         displayStatus.className = 'offline';
    //         displayStatus.title = 'Offline';
    //     };

    // }
} else {
    console.log('no offline useage available');
}
