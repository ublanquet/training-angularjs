(function() {
    'use strict';
    angular
        .module('app')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider'];
    function routesConfig($stateProvider) {
        $stateProvider
            .state('app', {
                url: '/',
                component: 'hello'
            });
    }
})();
