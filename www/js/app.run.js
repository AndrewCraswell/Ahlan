(function () {
    'use strict';

    angular.module('app')
      .run(executeBootstrap);

    executeBootstrap.$inject = [
        '$rootScope',
        'base',
    ];

    function executeBootstrap(
        $rootScope,
        base
        ) {

        $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);

        function stateChangeSuccess() {
            // Reset scroll to top on page navigation
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }
}());
