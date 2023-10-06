var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var filmsRouter = require('./routes/films');

var app = express();

let object = {};

app.use((req, res, next) => {
    //console.log("La requete est de type "+ req.method);
    //console.log(req.url);
    let path = req.method+" "+req.path;
    
    object[path] = (object[path] ? object[path] + 1 : 1);

    let text = "Request counter :\n";
    
    for (let value in object) {
        text +=` - ${value} : ${object[value]} \n`;
    }
    console.log(text);
   
    next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/films', filmsRouter);

module.exports = app;
