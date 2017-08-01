var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * MeasuringDevice Model
 * ==========
 */

var MeasuringDevice = new keystone.List('MeasuringDevice', {
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

MeasuringDevice.add({
	manufacturer: { type: Types.Relationship, ref: 'MeasuringDeviceManufacturer', many: false, initial: true, createInline: true },
  title: { type: Types.Text, required: true, index: true, initial: true },
  heroImage: { type: Types.CloudinaryImage, collapse: true },
	description: {
		brief: { type: Types.Textarea, height: 150, initial: true },
		extended: { type: Types.Textarea, height: 400 }
	},
	images: { type: Types.CloudinaryImages, collapse: true },
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

MeasuringDevice.schema.virtual('description.full').get(function () {
	return this.description.extended || this.description.brief;
});

MeasuringDevice.defaultColumns = 'title, state|20%, createdBy|20%, createdAt|20%';
MeasuringDevice.register();
