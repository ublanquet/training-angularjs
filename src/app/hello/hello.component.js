(function () {
    'use strict';

    angular.module('app.hello')
        .component('hello', {
            templateUrl: 'src/app/hello/hello.html',
            controller: HelloController
        });

    function HelloController($log) {
        // jshint validthis: true
        const vm = this;
        vm.hello = 'Hello World!';
        vm.$onInit = $onInit;

        function $onInit() {
            $log.debug('HelloController init');
        }
    }
})();
