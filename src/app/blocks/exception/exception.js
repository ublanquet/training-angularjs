(function() {
    'use strict';

    angular
        .module('blocks.exception')
        .factory('exception', exception);

    /* @ngInject */
    function exception($q, $log) {
        var service = {
            catcher: catcher
        };
        return service;

        function catcher(message) {
            return function(e) {
                var thrownDescription;
                var newMessage;
                if (e.data && e.data.description) {
                    thrownDescription = '\n' + e.data.description;
                    newMessage = message + thrownDescription;
                }
                if (!e.data) {
                    e.data = {};
                }
                e.data.description = newMessage;
                $log.error(newMessage);
                return $q.reject(e);
            };
        }
    }
})();
