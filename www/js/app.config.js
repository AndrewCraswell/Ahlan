(function () {
    'use strict';

    angular.module('app')
      .config(configure);

    configure.$inject = [
        '$locationProvider',
        '$compileProvider',
        '$urlMatcherFactoryProvider'
    ];

    function configure($locationProvider,
                       $compileProvider,
                       $urlMatcherFactoryProvider) {

        // Enable pushState for clients where it's available. This cleans the Urls, and removes the '#'
        $locationProvider.html5Mode(true);

        // Disable debug data to improve performance
        $compileProvider.debugInfoEnabled(false);

        // Disable strict route matching to allow optional trailing "/" in routes
        $urlMatcherFactoryProvider.strictMode(false);
    }
}());
