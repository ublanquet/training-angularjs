(function() {
    'use strict';
    angular
        .module('app.hello')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider'];
    function routesConfig($stateProvider) {
        $stateProvider
            .state('app', {
                url: '/hello',
                component: 'hello'
            });
    }
})();
