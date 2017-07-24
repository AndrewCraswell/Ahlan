(function () {
    'use strict';

    angular
        .module('app.services.core')
        .factory('base', base);

    base.$inject = [
        '$state',
        'appConstants'
    ];

    function base($state, appConstants) {

        var service = {
            handleRequestError: handleRequestError
        };

        // Setup shared common elements that should be accessible by all inheritors
        service.common = {
            appConstants: appConstants
        };

        return service;

        // Private methods
        function isRequestSuccessful(response) {
            return response.status >= 200 && response.status < 300 || response.status === 304;
        }

        // Public methods
        function handleRequestError(response) {
            if (!isRequestSuccessful(response)) {
                switch (response.status) {
                    case 400:
                    case 401:
                        // Handled by authorization http interceptors, do nothing
                        break;

                        // 404 Resource not found
                    case 404:
                        // Should be handled on a case basis in the controller
                        break;

                        // Unknown Error - Redirect to the unexpected error page
                    default:
                        // Log the error to application insights.
                        // TODO: Integrate with Application Insights
                        break;
                }
            }
        }
    }
}());
