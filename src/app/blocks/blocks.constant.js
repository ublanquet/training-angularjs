/* global toastr:false */
(function () {
    'use strict';

    angular
        .module('blocks')
        .constant('toastr', toastr)
        .constant('Http', {
            OK: 200,
            CREATED: 201,
            ACCEPTED: 202,
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            FORBIDDEN: 403,
            INTERNAL_SERVER_ERROR: 500
        });
})();
