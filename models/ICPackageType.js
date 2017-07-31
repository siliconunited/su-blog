var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ICPackageType Model
 * ==========
 */

var ICPackageType = new keystone.List('ICPackageType', {
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

ICPackageType.add({
  title: { type: Types.Text, required: true, index: true, initial: true },
  heroImage: { type: Types.CloudinaryImage, collapse: true },
	description: {
		brief: { type: Types.Textarea, height: 150, initial: true },
		extended: { type: Types.Textarea, height: 400 }
	},
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

ICPackageType.schema.virtual('description.full').get(function () {
	return this.description.extended || this.description.brief;
});

ICPackageType.relationship({ ref: 'Microcontroller', path: 'microcontrollers', refPath: 'icPackageType' });

ICPackageType.defaultColumns = 'title, state|20%, createdBy|20%, createdAt|20%';
ICPackageType.register();
