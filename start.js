var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
 
var app = express();
 
app.use(logger('dev'));
app.use(bodyParser.json());
 
app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  //res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

//app.all('/loctrac/api/*', [require('./auth/validateRequest')]);


//app.use('/', require('./routes'));
 
// No route matched.404
app.use(function(req, res, next) {
  var err = new Error('Resource Not Found');
  err.status = 404;
  next(err);
});
 
// Start the server
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1")
var server = app.listen(app.get('port'),app.get('ipaddr'), function() {
  console.log('Express server listening ' + JSON.stringify(server.address()));
});
