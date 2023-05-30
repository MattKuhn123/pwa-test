var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');

const initHabitats = require('./data/habitats.json');
const habitats = initHabitats;
const initSpecies = require('./data/species.json');
const species = initSpecies;
const initStations = require('./data/stations.json');
const stations = initStations;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());

app.get('/habitats', (req, res) => res.send(habitats));
app.post('/habitats', (req, res) => habitats.push(req.body));

app.get('/species', (req, res) => res.send(species));
app.post('/species', (req, res) => species.push(req.body));

app.get('/stations', (req, res) => res.send(stations));
app.post('/stations', (req, res) => stations.push(req.body));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
