(function () {
    'use strict';
    angular.module('service.api.cdb', [])
        .factory('computersApi', computersApi);
    /* @ngInject */
    function computersApi($http) {
        return {
            list: (callback) => {
                $http.get(env.api.URL + '/computers').then(callback)
            },
            getPage: (pageN, callback) => $http.get(`${env.api.URL}/computers`+ '?pageN='+pageN).then(callback),
            get: (id, callback) => $http.get(`${env.api.URL}/computers/${id}`).then(callback)
        }
    }
})();