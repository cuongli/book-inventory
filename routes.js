var express = require('express');


module.exports = function (bookRepository) {
    return {
        getCount: function (req, res) {
            bookRepository.getCount(req.params.isbn).then(function (result) {
                if (result !== null) {
                    //res.status(200).json({count: result});
                    res.format({
                        //If the header is not specified, invoke this
                        'text/plain': function(){
                            res.send('Plain text');
                        },

                        'text/html': function(){
                            res.send('<p>available</p>');
                        },

                        'application/json': function(){
                            res.send({ title: 'Yolo!', subtitle: 'More then you needed', thumbnail: 'thumbnail', type: 'application/json' });
                        },
                        //no match is found
                        'default': function() {
                            // log the request and respond with 406
                            res.status(406).send('Not Acceptable');
                        }
                    });
                } else {
                    res.status(404).json({error: 'No book with ISBN: ' + req.params.isbn});
                }
            });
        },
        stockUp: function (req, res, next) {
            bookRepository.
                stockUp(req.body.isbn, req.body.count).
                then(function (result) {
                    res.json({isbn: req.body.isbn, count: req.body.count});
                }).
                catch(next);
        },
        findAll: function (req, res, next) {
            bookRepository.
                findAll().
                then(function (books) {
                    res.json(books);
                }).
                catch(next);
        }
    };
};