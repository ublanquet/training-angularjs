/* global sinon */
(function() {
    'use strict';

    beforeEach(module('app', $provide => {
        $provide.constant('toastr', sinon.stub({
            info: function() {},
            error: function() {},
            warning: function() {},
            success: function() {}
        }));
    }));
})(angular);
