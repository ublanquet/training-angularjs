(function() {
    'use strict';
    angular
        .module('app')
        .config(routesConfig);

    function routesConfig($stateProvider) {
        $stateProvider
            .state('app', {
                url: '/',
                component: 'hello'
            })
            .state('hello', {
                url: '/hello',
                component: 'cdbHello'
            });
    }
})();
