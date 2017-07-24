/* globals inject */
describe('Request Hasher Service', function () {
    'use strict';

    var requestHasher;

    beforeEach(module('app.services.data'));

    beforeEach(
        inject(function (
            _requestHasher_
        ) {
            requestHasher = _requestHasher_;
        }));

    it('should get hash', function () {
        var requestUrl = 'http://foo';
        var requestConfig = {
            method: 'GET',
            url: requestUrl,
            params: {
                name: 'test'
            }
        };

        var hash1 = requestHasher.getHash(requestConfig);
        var hash2 = requestHasher.getHash(requestConfig);

        expect(hash1).toEqual(hash2);
    });

    it('should hash empty to zero', function () {
        var requestConfig = {
            method: '',
            url: ''
        };
        var hash = requestHasher.getHash(requestConfig);
        expect(hash).toEqual(0);
    });
});
