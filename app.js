var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var middleware = require('./middleware');


module.exports = function (bookRepository) {
    app.use(middleware.logRequest);
    app.use(bodyParser.json());

    app.get('/', middleware.logRequest, function (req, res) {
        //throw new Error('server error happened');
        res.send('Hello World!');
    });

    var routes = require('./routes')(bookRepository);


    app.get('/stock', routes.findAll);
    app.post('/stock', routes.stockUp);
    app.get('/stock/:isbn', routes.getCount);

    app.use(middleware.clientError);
    app.use(middleware.serverError);

    return app;
};
