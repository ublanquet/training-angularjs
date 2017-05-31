(function() {
    'use strict';
    angular
        .module('app')
        .config(routesConfig);

    /* @ngInject */
    function routesConfig($stateProvider) {
        $stateProvider
            .state('hello', {
                url: '/hello',
                component: 'cdbHello'
            });
    }
})();
