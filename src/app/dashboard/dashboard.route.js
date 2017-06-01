(function() {
    'use strict';
    angular
        .module('app')
        .config(routesConfig);

    /* @ngInject */
    function routesConfig($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                component: 'cdbDashboard'
            });
    }
})();
