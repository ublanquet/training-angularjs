(function () {
    'use strict';
    angular.module('model.cdb', [])
        .factory('Company', Company)
        .factory('Computer', Computer);

    function Computer(Company) {
        /**
         * Constructor, with class name
         */
        function Computer(id, name, introduced, discontinued, company) {
            // Public properties, assigned to the instance ('this')
            this.id = id;
            this.name = name;
            this.introduced = introduced == null ? null : new Date(introduced);
            this.discontinued = discontinued == null ? null : new Date(discontinued);
            this.company = company;
        }

        /**
         * Static method, assigned to class
         * Instance ('this') is not available in static context
         */
        Computer.build = function (data) {
            return new Computer(
                data.id,
                data.name,
                data.introducedTimestamp,
                data.discontinuedTimestamp,
                data.company === null ? null : Company.build(data.company) // another model
            );
        };

        Computer.mapper = function (responseData) {
            return Computer.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return Computer;
    }
    Computer.$inject = ['Company'];
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
                data.name
            );
        };

        /**
         * Return the constructor function
         */
        return Company;
    }
})();
