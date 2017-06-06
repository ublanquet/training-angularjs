(function () {
    'use strict';
    angular.module('app')
        .component('cdbForm', {
            templateUrl: 'src/app/form/formComputer.html',
            controller: FormController
        });
    /* @ngInject */
    function FormController($log, $stateParams, computersApi) {
        // jshint validthis: true
        const vm = this;
        vm.$onInit = $onInit;
        vm.id = $stateParams.id;

        if (vm.id != undefined) { // if id undefined, add state, else edit state
            vm.computer = computersApi.get(vm.id, (response) => {
                vm.computer = response.data;
            });
        }

        function $onInit() {
            $log.debug('FormController init');
        }
    }
})();
