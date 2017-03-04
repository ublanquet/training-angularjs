(function () {
    'use strict';

    angular.module('app')
        .component('cdbShell', {
            templateUrl: 'src/app/shell.html',
            controller: ShellController
        });

    /* @ngInject */
    function ShellController($log) {
        // jshint validthis: true
        const vm = this;

        /* ***
         * Lifecycle
         */
        vm.$onInit = function () {
            $log.debug('shell controller init');
        };
    }
})();
