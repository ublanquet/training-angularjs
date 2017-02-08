env = Object.assign(env, {
    debug: false,
    asserts: true,
    toasterLevel: 'E', // possible values : D(ebug) > I(nfo) > W(arn) > E(rror) > N(one)
    flavor: 'prod',
    api: {
        URL: 'http://localhost:8080/api'
    }
});
