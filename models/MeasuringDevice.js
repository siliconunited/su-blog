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
	CPUCount: {
    type: Types.Number,
		label: 'CPU Count',
		initial: true
  },
	cpus: {
		type: Types.Relationship,
		ref:'CPU',
		createInline: true,
		required: true,
		initial: true,
		many: true,
		index: true,
		label: 'CPUs'
	},
	url: { type: Types.Url },
	purchaseUrl: { type: Types.Url },
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

MeasuringDevice.relationship({ ref: 'TestFixture', path: 'test-fixtures', refPath: 'measuringDevices' });

MeasuringDevice.defaultColumns = 'title, state|20%, createdBy|20%, createdAt|20%';
MeasuringDevice.register();
