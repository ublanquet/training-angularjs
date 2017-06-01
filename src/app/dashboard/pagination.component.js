(function () {
    'use strict';
    angular.module('app')
        .component('cdbPagination', {
            templateUrl: 'src/app/dashboard/pagination.html',
            controller: PaginationController,
            bindings: {
                page: '='
            }
        });
    /* @ngInject */
    function PaginationController($log, computersApi) {
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

        vm.getPage = function getPage(num) {
            vm.page = computersApi.getPage(num, (response) => {
                vm.page = response.data;
            });
        }
    }
})();
