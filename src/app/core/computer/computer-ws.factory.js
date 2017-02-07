(function () {
    'use strict';

    angular.module('app.dashboard')
        .factory('computerWs', computerWs);

    /* ngInhect */
    function computerWs($log, api) {
        const TAG = 'computerWs';
        return {
            fetchAll,
            fetchPage,
            fetchOne,
            add,
            update
        };

        function fetchAll() {
            $log.debug(TAG, 'fetchAll');
            return api(`computers/`).get();
        }

        function fetchPage(page) {
            $log.debug(TAG, 'fetchAll');
            page = page || {};
            page.limit = page.limit || 10000;
            page.offset = page.offset || 0;
            return api(`computers/`).get(page);
        }

        function fetchOne(id) {
            $log.debug(TAG, 'fetchOne');
            return api(`computers/${id}`).get();
        }

        function add(computer) {
            $log.debug(TAG, 'add');
            return api(`computers/`).post(computer);
        }

        function update(computer) {
            $log.debug(TAG, 'update');
            assert(angular.isDefined(computer.id));
            return api(`computers/`).update(computer);
        }

    }
})();
