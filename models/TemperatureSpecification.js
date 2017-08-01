var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * TemperatureSpecification Model
 * ==========
 */

var TemperatureSpecification = new keystone.List('TemperatureSpecification', {
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

TemperatureSpecification.add({
	value: { type: Types.Text, initial: true, required: true },
	unit: {
    type: Types.Select,
    options: 'F, C, K',
    emptyOption: true,
    index: true,
		initial: true,
		required: true
  },
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

TemperatureSpecification.schema.virtual('description.full').get(function () {
	return this.description.extended || this.description.brief;
});

TemperatureSpecification.relationship({ ref: 'Microcontroller', path: 'microcontrollers', refPath: 'operatingTemperature' });

TemperatureSpecification.defaultColumns = 'value, unit|20%, createdBy|20%, createdAt|20%';
TemperatureSpecification.register();
