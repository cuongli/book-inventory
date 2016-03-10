var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var middleware = require('./middleware');


module.exports = function (bookRepository, auth) {
    app.use(middleware.logRequest);
    app.use(bodyParser.json());
    //if(auth) app.use(auth);

    app.get('/', middleware.logRequest, function (req, res) {
        //throw new Error('server error happened');
        res.send('Hello super duper user!');
    });

    var routes = require('./routes')(bookRepository);


    app.get('/stock', routes.findAll);
    app.post('/stock', routes.stockUp);
    app.get('/stock/:isbn', routes.getCount);

    app.use(middleware.clientError);
    app.use(middleware.serverError);

    return app;
};
