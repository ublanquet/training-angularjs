/**
 * @ngdoc value
 *
 * @description configure a $log decorator for app
 * The decorator adds lines numbers to debug & warn logs.
 */
(function () {
    'use strict';
    angular.module('blocks.logger')
        .config(configLogDecorator);

    configLogDecorator.$inject = ['$provide'];
    function configLogDecorator($provide) {
        $provide.decorator('$log', logDecorator);
    }

    logDecorator.$inject = ['$delegate', 'toastr'];
    function logDecorator($delegate, toastr) {
        let originalFns = {};

        // Store the original log functions
        angular.forEach($delegate, function (originalFunction, functionName) {
            originalFns[functionName] = originalFunction;
        });
        let toastLevel = env.toasterLevel || 'N';
        let toastLevels = {
            N: 0,
            E: 1,
            W: 2,
            I: 3,
            D: 4
        };

        $delegate.error = decorateStacktrace(originalFns.error, toastr.error, toastLevels[toastLevel] >= 1);
        $delegate.warn = decorateStacktrace(originalFns.warn, toastr.warning, toastLevels[toastLevel] >= 2);
        $delegate.info = decorateStacktrace(originalFns.info, toastr.info, toastLevels[toastLevel] >= 3);
        $delegate.debug = decorateStacktrace(originalFns.debug, toastr.success, toastLevels[toastLevel] >= 4, {
            iconClass: 'toast-debug'
        });
        return $delegate;
    }

    function decorateStacktrace(fn, toastr, enalbleToast, toastParam) {
        return function () {
            /* jshint -W074 */

            if (!fn) {
                return;
            }

            let args = [].slice.call(arguments) || [];

            // toast if toaster provided
            if (toastr && enalbleToast) {
                let msg, title;
                if (!angular.isObject(args[0])) {
                    msg = args[0];
                } else if (args[0] && args[0].message) {
                    msg = args[0].message;
                }

                if (!angular.isObject(args[1])) {
                    title = args[1];
                }
                toastr.apply(toastr, [msg, title, toastParam]);
            }

            // Insert a separator between the existing log message(s) and what we're addiangular.
            args.push(' - ');

            // Use (instance of Error)'s stack to get the current line.
            let newErr = new Error();

            // phantomjs does not support Error.stack and falls over so we will skip it
            if (angular.isDefined(newErr.stack)) {
                let stack = newErr.stack.split('\n').slice(1);

                if (navigator.userAgent.indexOf('Chrome') > -1) {
                    stack.shift();
                }
                stack = stack.slice(0, 1);

                let stackInString = stack + '';
                let splitStack;
                if (navigator.userAgent.indexOf('Chrome') > -1) {
                    splitStack = stackInString.split(' ');
                } else {
                    splitStack = stackInString.split('@');
                }
                let lineLocation = splitStack[splitStack.length - 1];
                // Put it on the args stack.
                args.push(lineLocation);

                // Call the original function with the new args.
                try {
                    fn.apply(fn, args);
                } catch (error) {
                    // in case angular-mock, logging will throw an error. Simply mute it.
                }
            }
        };
    }
})();
