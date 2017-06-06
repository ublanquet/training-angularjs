(function() {
    'use strict';
    angular
        .module('app')
        .config(routesConfig);

    /* @ngInject */
    function routesConfig($stateProvider) {
        $stateProvider
            .state('edit', {
                url: '/edit/:id',
                component: 'cdbForm'
            })
            .state('add', {
                url: '/add',
                component: 'cdbForm'
            });
    }
})();
