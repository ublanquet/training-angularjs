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
        vm.edit = edit;
        vm.save = save;

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
            computersApi.add(vm.computer);
        }

        function edit() {
            console.log(JSON.stringify(computersApi.edit(vm.computer)));
            console.log(JSON.stringify(computer));
        }

        vm.formatDate = function () {
            // more robust logic here
            vm.value = format (vm.computer.introduced);
            vm.value = vm.valueEntered * 100;
        }
        /*
        $scope.$watch('dollars', function(dollars) {
            $scope.cents = $scope.dollars * 100;
        })*/
    }
})();
