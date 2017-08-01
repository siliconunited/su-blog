var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * MeasuringDeviceManufacturer Model
 * ==========
 */

var MeasuringDeviceManufacturer = new keystone.List('MeasuringDeviceManufacturer', {
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
  map: { name: 'title' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

MeasuringDeviceManufacturer.add({
  title: { type: Types.Text, required: true, index: true, initial: true },
  heroImage: { type: Types.CloudinaryImage, collapse: true },
	url: { type: Types.Url },
	description: {
		brief: { type: Types.Textarea, height: 150, initial: true },
		extended: { type: Types.Textarea, height: 400 }
	},
  images: { type: Types.CloudinaryImages, collapse: true },
	files: { type: Types.Relationship, ref:'DUTFile', many: true, createInline: true },
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

MeasuringDeviceManufacturer.schema.virtual('description.full').get(function () {
	return this.description.extended || this.description.brief;
});

MeasuringDeviceManufacturer.relationship({ ref: 'MeasuringDevice', path: 'measuring-devices', refPath: 'manufacturer' });

MeasuringDeviceManufacturer.defaultColumns = 'title, state|20%, createdBy|20%, createdAt|20%';
MeasuringDeviceManufacturer.register();
