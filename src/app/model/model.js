(function () {
    'use strict';
    angular.module('model.cdb', [])
        .factory('Company', Company)
        .factory('Computer', Computer);
    /* @ngInject */
    function Computer() {
        /**
         * Constructor, with class name
         */
        function Computer(id, name, introduced, discontinued, companyId, companyName) {
            // Public properties, assigned to the instance ('this')
            this.id = id;
            this.name = name;
            this.introduced = introduced;
            this.discontinued = discontinued;
            this.companyId = companyId;
            this.companyName = companyName;
        }

        /**
         * Static method, assigned to class
         * Instance ('this') is not available in static context
         */
        Computer.build = function (data) {
            return new Computer(
                data.id,
                data.name,
                data.introduced,
                Company.build(data.Company) // another model
            );
        };

        /**
         * Return the constructor function
         */
        return Computer;
    }

    /* @ngInject */
    function Company() {
        /**
         * Constructor, with class name
         */
        function Company(id, name) {
            // Public properties, assigned to the instance ('this')
            this.id = id;
            this.name = name;
        }

        /**
         * Static method, assigned to class
         * Instance ('this') is not available in static context
         */
        Company.build = function (data) {
            return new Company(
                data.id,
                data.name,
            );
        };

        /**
         * Return the constructor function
         */
        return Company;
    }
})();
