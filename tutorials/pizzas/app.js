var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var pizzaRouter = require('./routes/pizzas');

var app = express();

app.use((req, resr, next) =>{
    console.log('Time', Date.now());
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/pizzas', pizzaRouter);

module.exports = app;
