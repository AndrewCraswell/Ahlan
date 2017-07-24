(function () {
    'use strict';

    angular.module('app.services.data')
           .factory('repository.abstract', AbstractRepository);

    AbstractRepository.$inject = [
        '$q',
        '$http',
        'base',
        'requestFlattener',
        'CacheFactory'
    ];

    function AbstractRepository($q, $http, base, requestFlattener, CacheFactory) {

        function Ctor() {
            this._serviceBaseUrl = 'https://' + base.common.appSettings.microsoftAcademyServiceBaseUrl;
        }

        Ctor.extend = function (repoCtor) {
            // Allow this repo to access the AbstractRepository methods
            repoCtor.prototype = new Ctor();
            repoCtor.prototype.constructor = repoCtor;
        };

        // Stateless methods that can be shared across all repos
        Ctor.prototype = {
            constructor: Ctor,
            _execute: _execute,
            _getCache: _getCache,
            _clearCache: _clearCache
        };

        return Ctor;

        // Public methods
        function _execute(requestConfig, forceRefresh, skipErrorHandling) {
            var defer = $q.defer();

            if (forceRefresh && requestConfig.cache && requestConfig.url) {
                requestConfig.cache.remove(requestConfig.url);
            }

            // Combine identical concurrent requests into a single request
            var flattenedRequest = requestFlattener.flatten(requestConfig, defer.promise);
            if (flattenedRequest.count === 1) {
                // Execute the request
                $http(requestConfig).then(onSuccessCallback, onFailureCallback);
            }

            return flattenedRequest.promise;

            function onSuccessCallback(response) {
                defer.resolve(response.data);
            }

            function onFailureCallback(error) {
                defer.reject(error);

                if (!skipErrorHandling) {
                    base.common.insights.logException(error);
                }
            }
        }

        function _getCache(name, storageType) {
            var cacheIdentifier = name + '_' + storageType;
            if (CacheFactory.get(cacheIdentifier)) {
                return CacheFactory.get(cacheIdentifier);
            } else {
                return CacheFactory.createCache(cacheIdentifier, {
                    storageMode: storageType,
                    storagePrefix: ''
                });
            }
        }

        function _clearCache(name) {
            var caches = CacheFactory.keys();

            // Clear the cache across all storage types
            for (var i = 0; i < caches.length; i++) {
                if (caches[i].lastIndexOf(name, 0) === 0) {
                    CacheFactory.get(caches[i]).destroy();
                }
            }
        }
    }
})();
