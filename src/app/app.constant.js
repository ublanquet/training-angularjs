/* exported assert */
/* jshint -W079 */
let assert;

(function () {
    'use strict';
    angular.module('app');
    if (env.asserts) {
        assert = function (condition, message) {
            if (!condition) {
                throw new Error(message || 'Assertion failed');
            }
        };
    } else {
        assert = function () {
            // NOOP
        };
    }

    Object.freeze(assert);
})();
