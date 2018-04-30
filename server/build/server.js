'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _sourceMapSupport = require('source-map-support');

var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);

var _expressBusboy = require('express-busboy');

var _expressBusboy2 = _interopRequireDefault(_expressBusboy);

var _todoServer = require('./routes/todo.server.route');

var _todoServer2 = _interopRequireDefault(_todoServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// define our app using express
// ./express-server/app.js
var app = (0, _express2.default)();

// get reference to the client build directory


// import routes
var staticFiles = _express2.default.static(_path2.default.join(__dirname, '../../client/build'));
// pass the static files (react app) to the express app. 
app.use(staticFiles);

// express-busboy to parse multipart/form-data
_expressBusboy2.default.extend(app);

// allow-cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// configure app
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

// set the port
var port = process.env.PORT || 3001;

// connect to database
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://localhost/mern-todo-app', {
  useMongoClient: true
});

// add Source Map Support
_sourceMapSupport2.default.install();

app.use('/api', _todoServer2.default);

app.get('/', function (req, res) {
  return res.end('Api working');
});

// catch 404
app.use(function (req, res, next) {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

app.use('/*', staticFiles);

app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), function () {
  console.log('Listening on ' + app.get('port'));
});

// // start the server
// app.listen(port,() => {
//   console.log(`App Server Listening at ${port}`);
// });