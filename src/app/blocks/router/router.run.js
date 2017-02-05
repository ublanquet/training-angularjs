(function() {
    'use strict';

    angular.module('blocks.router')
        .run(configureRouterHelper);

    function configureRouterHelper($location, $rootScope, $log, $transitions, routerHelper) {
        var handlingStateChangeError = false;
        init();

        function handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$stateChangeError',
                function(event, toState, toParams, fromState, fromParams, error) {
                    if (handlingStateChangeError) {
                        return;
                    }
                    stateCounts.errors++;
                    handlingStateChangeError = true;
                    var destination = (toState &&
                        (toState.title || toState.name || toState.loadedTemplateUrl)) ||
                        'unknown target';
                    var msg = 'Error routing to ' + destination + '. ' +
                        (error.data || '') + '. <br/>' + (error.statusText || '') +
                        ': ' + (error.status || '');
                    $log.warn(msg, [toState]);
                    if (error.stack) {
                        $log.error(error.stack);
                    }
                    $location.path('/');
                }
            );
        }

        function init() {
            handleRoutingErrors();
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
