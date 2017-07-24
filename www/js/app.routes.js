(function () {
    'use strict';

    angular.module('app')
      .config(routes);

    routes.$inject = [
        '$stateProvider',
        'appConstants'
    ];

    function routes(
      $stateProvider,
      appConstants) {

        // Now set up states
        var _states = appConstants.StateNames;

        $stateProvider

          // Root states
            .state(_states.APP, {
                abstract: true,
                template: '<ui-view/>'
            });
    }
}());
