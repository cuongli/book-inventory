var express = require('express');
var router = express.Router();


module.exports = function (bookRepository) {
    return {
        getCount: function (req, res) {
            bookRepository.getCount(req.params.isbn).then(function (result) {
                if (result !== null) {
                    res.status(200).json({count: result});
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