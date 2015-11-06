var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({ 
	name : {
		first: String,
		last: String
	},
	facebookObj: Schema.Types.Mixed
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
