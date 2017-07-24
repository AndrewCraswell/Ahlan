(function () {
    'use strict';

    angular.module('app.pages.errors')
       .controller('ErrorPageController', ErrorPageController);

    ErrorPageController.$inject = [
        '$state',
        '$stateParams',
        'base'
    ];

    function ErrorPageController(
        $state,
        $stateParams,
        base) {

        var ctrl = this;
        ctrl.data = {
            heading: $stateParams.heading || $state.current.data.defaultHeading,
            description: $stateParams.description || $state.current.data.defaultDescription,
            error: $stateParams.error
        };

        // Initialize the controller before use
        init();

        // Private methods
        function init() {
            if (ctrl.data && ctrl.data.error) {
                // eslint-disable-next-line no-console
                console.warn(ctrl.data.error);
            }
        }
    }
}());

