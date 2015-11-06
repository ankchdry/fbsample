var express = require('express');
var router = express.Router();

/* Get login page */

router.get('/', function(req, res) {
	res.render("index");
});

router.post('/', function(req, res) {
	res.send("Post is working fine too");
});

module.exports = router;
