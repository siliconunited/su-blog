var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * SensorType Model
 * ==========
 */

var SensorType = new keystone.List('SensorType', {
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
  map: { name: 'title' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

SensorType.add({
  title: { type: Types.Text, required: true, index: true, initial: true },
  heroImage: { type: Types.CloudinaryImage, collapse: true },
	// url: { type: Types.Url },
	description: {
		brief: { type: Types.Textarea, height: 150, initial: true },
		extended: { type: Types.Textarea, height: 400 }
	},
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

SensorType.schema.virtual('description.full').get(function () {
	return this.description.extended || this.description.brief;
});

SensorType.relationship({ ref: 'Sensor', path: 'sensors', refPath: 'type' });

SensorType.defaultColumns = 'title, state|20%, createdBy|20%, createdAt|20%';
SensorType.register();
