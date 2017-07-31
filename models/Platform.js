var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Platform Model
 * ==========
 */
var Platform = new keystone.List('Platform', {
	label: 'Platform',
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

Platform.add({
	categories: { type: Types.Relationship, ref: 'PlatformCategory', initial: true, many: true, createInline: true },
	title: { type: Types.Text, required: true, index: true },
	description: {
		brief: { type: Types.Textarea, height: 150, initial: true },
		extended: { type: Types.Textarea, height: 400 }
	},
});


Platform.relationship({ ref: 'Microcontroller', path: 'microcontrollers', refPath: 'supportedPlatforms' });

/**
 * Registration
 */
Platform.defaultColumns = 'title, createdAt|20%, updatedAt|20%, createdBy|20%';
Platform.register();
