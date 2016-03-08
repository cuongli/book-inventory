var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/';
var connection = MongoClient.connect(url);


module.exports = function () {
    return {
        stockUp: function (isbn, count) {
            return connection.then(function (db) {
                return db.collection('books').updateOne({isbn: isbn}, {
                    isbn: isbn,
                    count: count
                }, {upsert: true});
            });
        },

        findAll: function () {
            return connection.then(function (db) {
                return db.collection('books').find({}).toArray();
            });
        },

        getCount: function (isbn) {
            return connection.then(function (db) {
                return db.collection('books').find({'isbn': isbn}).limit(1).next();
            });
        }
    };
};



