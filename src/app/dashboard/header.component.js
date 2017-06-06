(function () {
    'use strict';
    angular.module('app')
        .component('cdbHeader', {
            templateUrl: 'src/app/dashboard/header.html',
            controller: HeaderController
        });
    /* @ngInject */
    function HeaderController($log, $translate) {
        // jshint validthis: true
        const vm = this;
        vm.$onInit = $onInit;
        vm.changeLanguage = changeLanguage;

        function $onInit() {
            $log.debug('HeaderController init');
        }

        function changeLanguage(lang) {
            $translate.use(lang);
        }
    }
})();
