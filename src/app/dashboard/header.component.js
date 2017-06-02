(function () {
    'use strict';
    angular.module('app')
        .component('cdbHeader', {
            templateUrl: 'src/app/dashboard/header.html',
            controller: HeaderController
        });
    /* @ngInject */
    function HeaderController($log) {
        // jshint validthis: true
        const vm = this;
        vm.$onInit = $onInit;

        function $onInit() {
            $log.debug('HeaderController init');
        }
    }
})();
