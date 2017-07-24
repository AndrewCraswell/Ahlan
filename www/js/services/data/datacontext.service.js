(function () {
    'use strict';

    angular.module('app.services.data')
           .factory('datacontext', datacontext);

    datacontext.$inject = [
        '$injector',
        'base'
    ];

    function datacontext($injector, base) {
        var _repoNames = [
          'example' // Replace the example rep with real repositories
        ];

        var service = {
            // Repositories to be added by defineLazyLoadedRepos:
            //      example
        };

        init();

        return service;

        function init() {
            defineLazyLoadedRepos();
        }

        // Private methods

        // Add ES5 property to datacontext for each named repo
        function defineLazyLoadedRepos() {
            _repoNames.forEach(function (name) {
                Object.defineProperty(service, name, {
                    configurable: true, // will redefine this property once
                    get: function () {
                        // The 1st time the repo is request via this property,
                        // we ask the repositories for it (which will inject it).
                        var repo = getRepo(name);
                        // Rewrite this property to always return this repo;
                        // no longer redefinable
                        Object.defineProperty(service, name, {
                            value: repo,
                            configurable: false,
                            enumerable: true
                        });
                        return repo;
                    }
                });
            });
        }

        // Get named Repository Ctor (by injection), new it, and initialize it
        function getRepo(repoName) {
            var fullRepoName = 'repository.' + repoName;
            var Repository = $injector.get(fullRepoName);
            return new Repository();
        }
    }
}());
