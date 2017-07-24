/* globals inject */
describe('Request Flattener Service', function () {
    'use strict';

    var requestFlattener, $http, $q, $httpBackend;

    beforeEach(module('app.services.data'));
    beforeEach(
        inject(function (
            _requestFlattener_,
            _$http_,
            _$q_,
            _$httpBackend_
        ) {
            requestFlattener = _requestFlattener_;
            $http = _$http_;
            $q = _$q_;
            $httpBackend = _$httpBackend_;
        }));

    afterEach(function () {
        //$httpBackend.verifyNoOutstandingExpectation();
        //$httpBackend.verifyNoOutstandingRequest();
    });

    it('should flatten the request', function () {
        var requestUrl = 'http://foo';
        var requestConfig = {
            method: 'GET',
            url: requestUrl
        };

        $httpBackend.expect('GET', requestUrl)
            .respond(200, {});

        var defer = $q.defer();
        var flattenedRequest = requestFlattener.flatten(requestConfig, defer.promise);
        $http(requestConfig);
        expect(flattenedRequest.count).toEqual(1);

        var flattenedRequest = requestFlattener.flatten(requestConfig, defer.promise);
        $http(requestConfig);
        expect(flattenedRequest.count).toEqual(2);

        //$httpBackend.flush();
        defer.resolve({});
    });
});
