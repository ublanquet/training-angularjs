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
            vm.page = computersApi.getPage(num, vm.page.nbEntries, (response) => {
                vm.page = response.data;
            });
        };

        vm.nextPage = function nextPage() {
            var num = vm.page.currentPage + 1;
            if (num <= vm.page.maxPage) {
                vm.page = computersApi.getPage(num, vm.page.nbEntries, (response) => {
                    vm.page = response.data;
                });
            }
        };

        vm.prevPage = function prevPage() {
            var num = vm.page.currentPage - 1;
            if (num >= 0) {
                vm.page = computersApi.getPage(num, vm.page.nbEntries, (response) => {
                    vm.page = response.data;
                });
            }
        };

        vm.setPageSize = function setPageSize(nb) {
            vm.page.nbEntries = nb;
            vm.page = computersApi.getPage(vm.page.currentPage, vm.page.nbEntries, (response) => {
                vm.page = response.data;
            });
        }
    }
})();
