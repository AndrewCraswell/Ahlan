(function () {
    'use strict';

    angular.module('app.services.data')
           .factory('requestFlattener', requestFlattener);

    requestFlattener.$inject = [
        'base',
        'requestHasher',
    ];

    function requestFlattener(base, requestHasher) {
        var _runningRequests = [];

        var service = {
            flatten: flatten
        };

        return service;

        // Public methods
        function flatten(config, promise) {
            var hash = requestHasher.getHash(config);
            var flattened = addRunningRequest(hash, promise);

            if (flattened.count === 1) {
                promise.finally(function () {
                    removeRunningRequest(hash);
                });
            }
            return flattened;
        }

        // Private methods
        function addRunningRequest(id, promise) {
            if (getRunningRequest(id)) {
                _runningRequests[id].count++;
            } else {
                _runningRequests[id] = {
                    id: id,
                    promise: promise,
                    count: 1
                };
            }

            return getRunningRequest(id);
        }

        function getRunningRequest(id) {
            return _runningRequests[id];
        }

        function removeRunningRequest(id) {
            delete _runningRequests[id];
        }
    }
})();
