(function () {
    'use strict';
    angular.module('app')
        .component('cdbDashboard', {
            templateUrl: 'src/app/dashboard/dashboard.html',
            controller: DashboardController
        });
    /* @ngInject */
    function DashboardController($log, computersApi) {
        // jshint validthis: true
        const vm = this;
        vm.page = {};
        vm.hello = "test";
        vm.$onInit = $onInit;

        function $onInit() {
            $log.debug('DashboardController init');
            vm.page = computersApi.list((response) => {
                vm.page = response.data;
            });
        }
    }
})();
