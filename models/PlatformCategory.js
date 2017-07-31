var keystone = require('keystone');

/**
 * PlatformCategory Model
 * ==================
 */

var PlatformCategory = new keystone.List('PlatformCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

PlatformCategory.add({
	name: { type: String, required: true },
});

PlatformCategory.relationship({ ref: 'Platform', path: 'platforms', refPath: 'categories' });

PlatformCategory.register();
