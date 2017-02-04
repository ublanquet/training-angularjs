/**
 * @global
 */
// jshint -W079
let env;  // global variables goes here!

env = {
    name: 'Computer Database',
    debug: false,
    asserts: true,
    toasterLevel: 'D', // possible values : D(ebug) > I(nfo) > W(arn) > E(rror) > N(one)
    flavor: 'default',
    api: {
        URL: 'http://localhost:8080/api',
    }
};
