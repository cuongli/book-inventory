var heroin = require('heroin-js');

var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

/*configurator.export('cbook-inventory-service').then(function(result) {
    console.log(result);
});*/


var prod = {
    name: 'cbook-inventory-service-test',
    region: 'eu',
    maintenance: false,
    stack: 'cedar-14',
    config_vars: {
        NODE_ENV: 'production'},
        //MONGOLAB_URI: 'mongodb://heroku_v737m2qz:gr9le6ghrsc3n73uucrvsaf2b8@ds019498.mlab.com:19498/heroku_v737m2qz'},
    addons: {
        mongolab: {plan: 'mongolab:sandbox'}},
    collaborators: ['truongcv@gmail.com', 'yuwen.he@vg.no'],
    features: {
        'runtime-dyno-metadata': {enabled: false},
        'log-runtime-metrics': {enabled: false},
        'http-session-affinity': {enabled: false},
        preboot: {enabled: false},
        'http-shard-header': {enabled: false},
        'http-end-to-end-continue': {enabled: false}
    },
    formation: [{process: 'web', quantity: 1, size: 'Free'}],
    log_drains: []
    //domains: ['cbook-inventory-service.herokuapp.com']
};

configurator(prod);