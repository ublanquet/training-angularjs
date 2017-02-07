(function () {
    'use strict';
    angular
        .module('app.dashboard')
        .config(routesConfig);

    /* @ngInect */
    function routesConfig($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                component: 'dashboard'
            })
            .state('default', {
                url: '/',
                controller: RedirectController,
                controllerAs: '$ctrl'
            });
    }

    /* @ngInject */
    function RedirectController($state) {
        $state.go('dashboard');
    }
})();
