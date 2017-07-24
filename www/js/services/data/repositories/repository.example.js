(function () {
    'use strict';

    var serviceId = 'repository.example';
    angular.module('app.services.data')
           .factory(serviceId, exampleRepository);

    exampleRepository.$inject = [
        'base',
        'repository.abstract',
    ];

    function exampleRepository(base, AbstractRepository) {
        // eslint-disable-next-line no-unused-vars
        var _storageType = base.common.appConstants.StorageType;
        var _apiUrl = 'api/v1.0/example/';

        function Ctor() {
            // Expose public methods
            this.getExampleData = getExampleData;
            this.clearCache = clearCache;
            this.getCache = getCache;
        }

        AbstractRepository.extend(Ctor);
        return Ctor;

        // Public methods
        function getExampleData() {
            var self = this;

            var requestConfig = {
                method: 'GET',
                url:  _apiUrl
            };

            return self._execute(requestConfig);
        }

        function clearCache() {
            var self = this;

            self._clearCache(serviceId);
        }

        function getCache(storageType) {
            var self = this;

            return self._getCache(serviceId, storageType);
        }
    }
})();
