var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * VoltageSpecification Model
 * ==========
 */

var VoltageSpecification = new keystone.List('VoltageSpecification', {
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

VoltageSpecification.add({
	value: { type: Types.Number },
	unit: {
    type: Types.Select,
    options: 'volts, kilovolts, millivolts, microvolts, nanovolts',
    index: true,
		emptyOption: true,
  },
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

VoltageSpecification.relationship({ ref: 'Microcontroller', path: 'microcontrollers', refPath: 'supplyVoltageUnit' });

VoltageSpecification.defaultColumns = 'value, unit|20%, createdBy|20%, createdAt|20%';
VoltageSpecification.register();
