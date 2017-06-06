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
            computersApi.get(vm.id, (response) => {
                vm.computer = response.data;
            });
        }

        computersApi.getCompanies((response) => {
            vm.companies = response.data;
        });


        function $onInit() {
            $log.debug('FormController init');
        }

        function save() {
            computersApi.add();
        }

        function edit() {
            computersApi.edit(computer);
            console.log(JSON.stringify(computer));
        }
    }
})();
