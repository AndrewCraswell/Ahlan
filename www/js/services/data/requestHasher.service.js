(function () {
    'use strict';

    angular.module('app.services.data')
           .service('requestHasher', requestHasher);

    function requestHasher() {
        var _self = this;

        _self.getHash = getHash;

        // Public methods
        function getHash(config) {
            var str = config.method + config.url;
            if (config.params) {
                str += angular.toJson(config.params);
            }
            if (config.data) {
                str += angular.toJson(config.data);
            }
            return hash(str);
        }

        // Private methods
        function hash(str) {
            var h = 0;
            var strlen = str.length;
            if (strlen === 0) {
                return h;
            }

            /* eslint-disable no-bitwise */
            for (var i = 0, n; i < strlen; ++i) {
                n = str.charCodeAt(i);
                h = (h << 5) - h + n;
                h = h & h;
            }
            return h >>> 0;
            /* eslint-enable no-bitwise */
        }
    }
}());
