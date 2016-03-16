var bookRepository = require('./bookRepository')();
var auth = require('./authentication');
//var app = require('./app.js')(bookRepository, auth('admin', 'admin'));
var app = require('./app.js')(bookRepository);

app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000! ');
});