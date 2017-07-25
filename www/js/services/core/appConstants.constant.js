(function () {
    'use strict';

    angular
        .module('app.services.core')
        .constant('appConstants', Object.freeze({
            StateNames: {
                APP: 'app',
                HOME: 'app.home',

                ERROR_UNEXPECTED: 'app.unexpected-error',
                ERROR_404: '404',
            },
            StorageType: {
                MEMORY: 'memory',
                SESSION_STORAGE: 'sessionStorage',
                LOCAL_STORAGE: 'localStorage'
            }
        }));
})();
