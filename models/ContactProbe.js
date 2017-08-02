var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ContactProbe Model
 * ==========
 */

var ContactProbe = new keystone.List('ContactProbe', {
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

ContactProbe.add({
  title: { type: Types.Text, required: true, index: true, initial: true },
  heroImage: { type: Types.CloudinaryImage, collapse: true },
	description: {
		brief: { type: Types.Textarea, height: 150, initial: true },
		extended: { type: Types.Textarea, height: 400 }
	},
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

ContactProbe.relationship({ ref: 'TestFixture', path: 'test-fixtures', refPath: 'contactProbes' });

ContactProbe.schema.virtual('description.full').get(function () {
	return this.description.extended || this.description.brief;
});

ContactProbe.defaultColumns = 'title, state|20%, createdBy|20%, createdAt|20%';
ContactProbe.register();
