var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * FrequencySpecification Model
 * ==========
 */

var FrequencySpecification = new keystone.List('FrequencySpecification', {
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

FrequencySpecification.add({
	value: { type: Types.Number },
	unit: {
    type: Types.Select,
    options: 'microhertz, millihertz, Hz, kHz, MHz, GHz, THz',
    default: 'MHz',
    index: true,
		emptyOption: true,
  },
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

FrequencySpecification.relationship({ ref: 'EnergySpecification', path: 'energy-specifications', refPath: 'frequency' });

FrequencySpecification.defaultColumns = 'value, unit|20%, createdBy|20%, createdAt|20%';
FrequencySpecification.register();
