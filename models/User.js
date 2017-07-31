var keystone = require('keystone');
var randToken = require('rand-token');
var crypto = require('crypto');

var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	title: { type: Types.Text },
	name: { type: Types.Name, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	username: { type: Types.Text, initial: true, required: false, index: true },
	photo: { type: Types.CloudinaryImage, collapse: true },
	group: { type: Types.Select, options: 'user, engineer, moderator, admin', default: 'user', filters: { group: 'admin' } },
	clientId: { type: Types.Text, hidden: true, unique: true },
	clientSecret: { type: Types.Text, hidden: true, unique: true },
	resetPasswordKey: { type: Types.Text, hidden: true, unique: true },
	state: { type: Types.Select, options: 'active, unverified, banned, archive', default: 'unverified', index: true, filters: { group: 'admin' } }
},
'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true, default: false, filters: { group: 'admin' } },
	hasApiAccess: { type: Boolean, label: 'Has API access', index: true, default: true, filters: { group: 'admin' } },
});

User.schema.pre('save', function (next) {
	if (!this.password) {
		this.password = randToken.generate(16);
	}
	// Only generate this when requested via forgot password
	// if (!this.resetPasswordKey) {
	// 	// Generate a 24 (16 + 8) character alpha-numeric token:
	// 	var token = randToken.suid(16)
	// 	this.resetPasswordKey = token;
	// }
	if (!this.clientId) {
		// Generate a 24 (16 + 8) character alpha-numeric token:
		var clientId = this.generateClientId();
		this.clientId = clientId;
	}
	if (!this.clientSecret) {
		// Generate a 24 (16 + 8) character alpha-numeric token:
		var clientSecret = this.generateClientSecret();
		this.clientSecret = clientSecret;
	}
	next();
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	if(this.isAdmin) {
		return true;
	} else if(this.group === 'moderator') {
		return true;
	} else {
		return false;
	}
});

// Provide access to API
User.schema.virtual('canAccessApi').get(function () {
	return this.hasApiAccess;
});

// Generate a full name
User.schema.virtual('fullname').get(function () {
	return this.name.first + ' ' + this.name.last;
});

// generate client secret
User.schema.methods.generateClientId = function () {
	var bits = 16;
	var len = 16;
	return crypto.randomBytes(bits).toString('hex').slice(0,len);
};

// generate client api key
User.schema.methods.generateClientSecret = function () {
	var bits = 24;
	// Generate a 24 (16 + 8) character alpha-numeric token:
	return randToken.suid(bits);
};

/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin', 'hasApiAccess';
User.register();
