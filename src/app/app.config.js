(function () {
    'use strict';

    angular.module('app')
        .config(configureRoutes)
        .config(configureTranslateProvider)
        .config(toastrConfig)
        .config(configure);

    /* @ngInject */
    function configureTranslateProvider($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'src/resources/i18n/',
            suffix: '.json'
        });

        $translateProvider.addInterpolation('$translateMessageFormatInterpolation');
        $translateProvider.useSanitizeValueStrategy('escapeParameters');
        $translateProvider.preferredLanguage('fr');
        $translateProvider.useMissingTranslationHandlerLog();
    }

    /* @ngInject */
    function configureRoutes($urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $urlRouterProvider.otherwise('/');
    }

    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    /* @ngInject */
    function configure($logProvider, routerHelperProvider, exceptionHandlerProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        assert(env.name);
        const appTitle = env.name;
        exceptionHandlerProvider.configure(`[${appTitle}]`);
        routerHelperProvider.configure({docTitle: `${appTitle}: `});
    }
})();
