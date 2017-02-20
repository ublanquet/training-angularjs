/* eslint strict: [2, "global"] */
'use strict';

describe('hello component', () => {

    beforeEach(module('app', $provide => {
        $provide.factory('hello', () => {
            return {
                templateUrl: 'app/hello.html'
            };
        });
    }));
    it('should render hello world', angular.mock.inject(($rootScope, $compile) => {
        const element = $compile('<hello>Loading...</hello>')($rootScope);
        $rootScope.$digest();
        const h1 = element.find('h1');
        expect(h1.html()).to.be.equals('Hello World!');
    }));
});
