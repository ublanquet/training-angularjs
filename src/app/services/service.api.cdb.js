(function () {
    'use strict';
    angular.module('service.api.cdb', ['model.cdb'])
        .factory('computersApi', computersApi);

    /* @ngInject */
    function computersApi($http, Computer) {
        return {
            list: (callback) => {
                $http.get(env.api.URL + '/computers').then(pageMapper).then(callback);
            },
            getPage: (pageN, perPage, callback) => {
                $http.get(`${env.api.URL}/computers` + '?pageN=' + pageN + '&perPage=' + perPage)
                    .then(pageMapper).then(callback);
            },

            get: (id, callback) => {
                $http.get(`${env.api.URL}/computers/${id}`).then(computerMapper).then(callback);
            },

            getCompanies: (callback) => {
                $http.get(`${env.api.URL}/companies`).then(callback);
            },

            add: (computer, callback) => {
                $http.post(`${env.api.URL}/computers`, JSON.stringify(computer)).then(callback);
            },

            edit: (computer, callback) => {
                $http.put(`${env.api.URL}/computers`, JSON.stringify(computer)).then(callback);
            },

            delete: (computersIds, callback) => {
                $http.delete(`${env.api.URL}/computers`, computersIds).then(callback);
            }
        };

        function pageMapper(responseData) {
            /*responseData.data.list = responseData.data.list.map((data) => Computer.mapper(data));
            return responseData;*/ //to test

            var list = [];
            for (var i = 0; i < responseData.data.list.length; i++)
            {
                list.push(Computer.mapper(responseData.data.list[i]));
            }
            responseData.data.list = list;
            return responseData;
        }

        function computerMapper(responseData) {
            responseData.data = Computer.mapper(responseData.data);
            return responseData;
        }
    }
})();
