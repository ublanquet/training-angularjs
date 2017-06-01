(function () {
    'use strict';
    angular.module('service.api.cdb', [])
        .factory('computersApi', computersApi);
    /* @ngInject */
    function computersApi($http) {
        return {
            list: (callback) => {
                $http.get(env.api.URL + '/computers').then(callback)
            }
        }
    }
})();