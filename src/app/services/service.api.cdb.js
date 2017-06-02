(function () {
    'use strict';
    angular.module('service.api.cdb', ['model.cdb'])
        .factory('computersApi', computersApi);

    /* @ngInject */
    function computersApi($http, Computer) {
        return {
            list: (callback) => {
                $http.get(env.api.URL + '/computers').then(callback)
            },
            getPage: (pageN, perPage, callback) =>
                $http.get(`${env.api.URL}/computers` + '?pageN=' + pageN + '&perPage=' + perPage).then(pageMapper).then(callback),

            get: (id, callback) => $http.get(`${env.api.URL}/computers/${id}`).then(callback)
        };

        function pageMapper(responseData) {
            var list=[];
            for(var i= 0; i < responseData.data.list.length; i++)
            {
                list.push(Computer.mapper(responseData.data.list[i]));
            }
            responseData.data.list = list;
            return responseData;
        }
    }
})();