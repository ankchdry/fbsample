var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var login = require('./routes/login');
var auth = require('./routes/auth');
//var profile = require('./routes/profile');

var app = express();

// Setting up mongo connection
var MongoURI = 'mongodb://localhost/fbappdb';
mongoose.connect(MongoURI, function(err, res) {
	    if(err) {
		            console.log('ERROR connecting to: ' + MongoURI + '. ' + err);
			        } else {
					        console.log('MongoDB connected successfully to ' + MongoURI);
						    }
});



app.get('/', function(req, res) {  res.send("Hello World"); });
app.use('/login', login);
app.use('/auth', auth);
app.get('/success', function(req, res) {
	res.send('Hey you have done it');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Auth process goes here
app.use(passport.initialize());
app.use(passport.session());

var Account = require('./models/account');
passport.use(Account.createStrategy());

passport.use(new FacebookStrategy({
    clientID: '491997514274844',
    clientSecret: '6c21aad80ff8df92225849d32d242820',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //findOrCreateProfile({facebookId: profile.id}, profile, done);
    if(done) { console.log(profile) }
    else { console.log('API not working'); }
  }
));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
