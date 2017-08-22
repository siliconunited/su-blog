var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * TestFixture Model
 * ==========
 */

var TestFixture = new keystone.List('TestFixture', {
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

TestFixture.add({
  title: { type: Types.Text, required: true, index: true, initial: true },
  heroImage: { type: Types.CloudinaryImage, collapse: true },
	type: { type: Types.Relationship, ref:'TestFixtureType', label: 'Type', createInline: true, initial: true, index: true },
	measuringDevices: { type: Types.Relationship, ref:'MeasuringDevice', createInline: true, initial: true, many: true, index: true },
	contactProbes: { type: Types.Relationship, ref:'ContactProbe', createInline: true, initial: true, many: true, index: true },
	description: {
		brief: { type: Types.Textarea, height: 150, initial: true },
		extended: { type: Types.Textarea, height: 400 }
	},
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

TestFixture.schema.virtual('description.full').get(function () {
	return this.description.extended || this.description.brief;
});

TestFixture.relationship({ ref: 'Test', path: 'tests', refPath: 'testFixture' });

TestFixture.defaultColumns = 'title, state|20%, createdBy|20%, createdAt|20%';
TestFixture.register();
