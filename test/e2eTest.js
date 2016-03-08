var inmemoryBookRepository = require('../inmemoryBookRepository')();
var app = require('../app')(inmemoryBookRepository);
var request = require('supertest');
var assert = require('assert');


describe('POST /stock', function(){
    it('respond with json', function(done){
        request(app)
            .post('/stock')
            .send({"isbn": "1617291781", "count": 10})
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                assert.equal(res.body.isbn, "1617291781");
                done();
            });
    })
});