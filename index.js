var bookRepository = require('./bookRepository')();
var app = require('./app.js')(bookRepository);

app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!');
});