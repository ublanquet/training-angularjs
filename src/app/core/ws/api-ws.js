(function () {
    'use strict';

    angular.module('app.dashboard')
        .factory('api', api);

    /* ngInhect */
    function api($log, $http) {
        const BASE_URL = 'http://localhost:8080/rest/';

        const TAG = 'api';
        return function(url) {

            return {
                get: (params, config) => _execute('GET', url, null, params, config),
                post: (data, params, config) => _execute('POST', url, data, params, config),
                del: (params, config) => _execute('DEL', url, null, config),
                update: (data, params, config) => _execute('UPDATE', url, data, params, config),
                patch: (data, params, config) => _execute('PATCH', url, data, params, config)
            };
        };

        function _execute(method, url, data, params, config) {
            url = BASE_URL + url;
            $log.debug(TAG, `[${method}] - ${url}`);
            return $http({
                method,
                url,
                data,
                config,
                params
            }).then(res => res.data);
        }
    }
})();
