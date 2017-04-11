(function() {
    'use strict';

    angular.module('blocks.router')
        .run(configureRouterHelper);

    /* @ngInject */
    function configureRouterHelper($rootScope, $transitions, routerHelper) {
        let handlingStateChangeError = false;
        init();

        function init() {
            updateDocTitle();
        }

        function updateDocTitle() {
            $transitions.onSuccess({}, function(tansition) {
                routerHelper.stateCounts.changes++;
                handlingStateChangeError = false;
                $rootScope.title = routerHelper.docTitle + ' ' + (tansition.to.name || ''); // data bind to <title>
            });
        }
    }
})();
