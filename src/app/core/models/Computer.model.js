(function() {
    'use strict';
    angular.module('app.core.models')
        .factory('Computer', model);

    function model() {
        class Computer {
            constructor(computer = {}) {
                const c = computer;
                this.id = c.id;
                this.name = c.name;
                this.released = c.released;
                this.discontinued = c.discontinued;
                this.company = c.company;
            }
        }

        Computer.Builder = class {
            constructor(computer = {}) {
                this._obj = angular.copy(computer);
            }
            name(name) {
                this._obj.name = name;
                return this;
            }
            id(id) {
                this._obj.id = id;
                return this;
            }
            released(released) {
                this._obj.released = released;
                return this;
            }
            discontinued(discontinued) {
                this._obj.discontinued = discontinued;
                return this;
            }
            company(company) {
                this._obj.company = company;
                return this;
            }
            build() {
                return new Computer(this._obj);
            }
        };

        return Computer;
    }

})();