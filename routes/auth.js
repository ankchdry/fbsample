var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/facebook', passport.authenticate('facebook', { scope: ['user_status', 'user_checkins'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { 
	successRedirect: '/success', 
	  failureRedirect: '/auth' 
}));
router.get('/temp', function(req, res) { res.send('temp page'); });
module.exports = router;
