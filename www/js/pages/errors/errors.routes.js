(function () {
    'use strict';

    angular.module('app.pages.errors')
      .config(config);

    config.$inject = [
        '$stateProvider',
        '$urlRouterProvider',
        'appConstants'
    ];

    function config(
        $stateProvider,
        $urlRouterProvider,
        appConstants) {

        // Configure the error states
        var _states = appConstants.StateNames;
        $stateProvider
            .state(_states.ERROR_UNEXPECTED, {
                url: '/error',
                templateUrl: 'error.tpl.html',
                controller: 'ErrorPageController',
                controllerAs: 'erpc',
                data: {
                    defaultHeading: 'The page has encountered an unexpected error.',
                    defaultDescription: [
                        'It seems something has gone wrong.',
                        'The issue has been logged, and we apologize for the inconvenience.'
                    ].join(' '),
                },
                params: {
                    heading: null,
                    description: null,
                    error: null
                }
            })
            .state(_states.ERROR_404, {
                url: '/404',
                templateUrl: 'error.tpl.html',
                controller: 'ErrorPageController',
                controllerAs: 'erpc',
                data: {
                    defaultHeading: 'We are sorry, the page you requested cannot be found.',
                    defaultDescription:
                        'The URL may be misspelled or the page you\'re looking for is no longer available.',
                },
                params: {
                    heading: null,
                    description: null,
                    requestId: null
                }
            });

        // Configure a catch-all handler which redirects to the 404 page
        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');

            $state.go(_states.ERROR_404, {}, {
                location: false
            });
        });
    }
}());
