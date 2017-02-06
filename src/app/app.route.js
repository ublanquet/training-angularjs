(function() {
    'use strict';
    angular
        .module('app')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider'];
    function routesConfig($stateProvider) {
        $stateProvider
            .state('404', {
                url: '/404',
                templateUrl: '404.html'
            });
    }
})();
