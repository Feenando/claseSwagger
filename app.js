var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-definitions/swagger.json');
var config = require('config');

var appRoutes = require('./routes/v1/app');

var app = express();



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

// CORS
app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

var api_path = (config && config.api_path) ? config.api_path : '';

// Define routes
app.use(api_path + '/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(api_path + '/v1', appRoutes);
app.use(api_path + '/', function(req, res, next) {
  res.status(200).send({message:'root path... nothing to do here'});
});

app.use(function(err, req, res, next) {
  if (!err.status)
      err.status = 404;
  var error = new Error();
  error.status = err.status;
  error.message = err.message;
  error.error = (err.error || '');
  res.status(error.status).send({ status: 'error', message: (error.message || 'Internal error'), error: error.error });
});



module.exports = app;
