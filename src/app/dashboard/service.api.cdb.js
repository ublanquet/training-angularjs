(function () {
    'use strict';
    angular.module('service.api.cdb', [])
        .factory('computersApi', computersApi);
    /* @ngInject */
    function computersApi($http) {
        return {
            list: (callback) => {
                $http.get(env.api.URL + '/computers')

                $http({
                    method: 'GET',
                    url: env.api.URL + '/computers',
                    headers: {
                        'Authorization': 'Basic' +  ' dGVzdDp0ZXN0'
                    },
                }).then(callback)
            }
        }
    }
})();