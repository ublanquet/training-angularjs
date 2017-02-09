(function () {
    'use strict';

    angular.module('app.dashboard')
        .factory('computerWs', computerWs);

    /* ngInject */
    function computerWs($log, api, Computer) {
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
            return api(`computers/`).get().then(cc => cc.map(c => new Computer(c)));
        }

        function fetchPage(page) {
            $log.debug(TAG, 'fetchAll');
            page = page || {};
            page.limit = page.limit || 10;
            page.offset = page.offset || 0;
            return api(`computers/`).get(page).then(page => {
                page.items = page.items.map(c => new Computer(c));
                return page;
            });
        }

        function fetchOne(id) {
            $log.debug(TAG, 'fetchOne');
            return api(`computers/${id}`).get().then(c => new Computer(c));
        }

        function add(computer) {
            $log.debug(TAG, 'add');
            return api(`computers/`).post(computer);
        }

        function update(computer) {
            $log.debug(TAG, 'update');
            assert(angular.isDefined(computer.id));
            return api(`computers/`).update(computer).then(c => new Computer(c));
        }

    }
})();
