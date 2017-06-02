(function () {
    'use strict';
    angular.module('app')
        .component('cdbPagination', {
            templateUrl: 'src/app/dashboard/pagination.html',
            controller: PaginationController,
            bindings: {
                page: '<',
                events: '<'
            }
        });
    /* @ngInject */
    function PaginationController($log) {
        // jshint validthis: true
        const vm = this;
        //vm.page = {};
        vm.counter = function(num) {
            return new Array(num);
        };
        vm.hello = "test";
        vm.$onInit = $onInit;

        function $onInit() {
            $log.debug('PaginationController init');
        }
    }
})();
