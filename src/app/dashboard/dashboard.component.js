(function () {
    'use strict';

    angular.module('app.dashboard')
        .component('dashboard', {
            templateUrl: 'src/app/dashboard/dashboard.html',
            controller: DashboardController
        });

    /* ngInhect */
    function DashboardController($log, computerWs) {
        // jshint validthis: true
        const vm = this;
        vm.$onInit = $onInit;

        vm.items = [];

        function $onInit() {
            $log.debug('DashboardController init');

            computerWs.fetchPage().then(page => {
                vm.items = page.items;
                return page;
            });
        }
    }
})();
