var keystone = require('keystone');

/**
 * TestCategory Model
 * ==================
 */

var TestCategory = new keystone.List('TestCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

TestCategory.add({
	name: { type: String, required: true },
});

TestCategory.relationship({ ref: 'Test', path: 'tests', refPath: 'categories' });

TestCategory.register();
