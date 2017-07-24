(function () {
    'use strict';

    angular
        .module('app.services.core')
        .decorator('$state', $stateDecorator);

    $stateDecorator.$inject = [
        '$delegate',
        '$injector',
        '$rootScope'
    ];

    function $stateDecorator($delegate, $injector, $rootScope) {
        function decorated$State() {
            var $state = $delegate;
            $state.previous = undefined;

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $state.previous = {
                    state: fromState,
                    stateParams: fromParams
                };
            });

            return $state;
        }

        return decorated$State();
    }
}());
