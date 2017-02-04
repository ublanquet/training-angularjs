angular
    .module('app')
    .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider) {
    $stateProvider
        .state('app', {
            url: '/',
            component: 'hello'
        });
}

