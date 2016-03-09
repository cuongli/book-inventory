var express = require('express');
var router = express.Router();
var request = require('request');
var goodGuy = require('good-guy-http')({
    maxRetries: 3,
    cacheResponseTimeout: 500
});
var jp = require('jsonpath');
var ESI = require('nodesi');
var esi = new ESI({
    onError: function (src, error) {  }
});


router.get('/:isbn', function (req, res, next) {
    var googlebook = 'https://book-catalog-proxy-5.herokuapp.com/book?isbn=' + req.params.isbn;
    var url = 'http://localhost:3000/stock/' + req.params.isbn;

    goodGuy(googlebook).then(function (response) {
        var jsonbody = JSON.parse(response.body);
        var title = jp.query(jsonbody, '$..title');
        var subtitle = jp.query(jsonbody, '$..subtitle');
        var cover = jp.query(jsonbody, '$..thumbnail');

        return new Promise(function (resolve, reject) {
            req.app.render('book',
                {
                    cover: cover,
                    title: title,
                    subtitle: subtitle,
                    url: url},
                function (err, html) {
                    if (err) reject(err);
                    resolve(html);
                });
        });
    }).then(function (html) {
        return esi.process(html, {
            headers: {
                'Accept': 'text/html'
            }
        }); // this is async
    }).then(function (html) {
        return res.send(html);
    }).catch(next);
});

module.exports = router;