(function () {
    'use strict';
    angular.module('model.cdb.computer', [])
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
                data.first_name,
                data.last_name,
                data.role,
                Organisation.build(data.organisation) // another model
            );
        };

        /**
         * Return the constructor function
         */
        return Computer;
    }
})();
