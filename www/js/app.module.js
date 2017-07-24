(function () {
    'use strict';

    angular.module('app', [
      'ionic',

      // Services
      'app.service.core',
      'app.services.data',

      // Pages
      'app.pages.errors'
    ]);

}());
