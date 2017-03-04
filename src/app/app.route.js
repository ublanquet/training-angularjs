(function() {
    'use strict';
    angular
        .module('app')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider'];
    function routesConfig($stateProvider) {
        $stateProvider
            .state('shell.404', {
                url: '/404',
                templateUrl: '404.html'
            });

        $stateProvider
            .state('shell', {
                abstract: true,
                component: 'cdbShell'
            });
    }
})();
