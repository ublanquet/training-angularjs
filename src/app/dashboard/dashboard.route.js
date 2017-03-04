(function () {
    'use strict';
    angular
        .module('app.dashboard')
        .config(routesConfig);

    /* @ngInect */
    function routesConfig($stateProvider) {
        $stateProvider
            .state('shell.dashboard', {
                url: '/dashboard',
                component: 'dashboard'
            })
            .state('shell.default', {
                url: '/',
                component: 'dashboard'
            });
    }
})();
