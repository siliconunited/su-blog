var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PowerSpecification Model
 * ==========
 */

var PowerSpecification = new keystone.List('PowerSpecification', {
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

PowerSpecification.add({
	value: { type: Types.Number },
	unit: {
    type: Types.Select,
    options: 'horsepower (HP), watts (W), megawatts, kilowatts, milliwatts, microwatts, nanowatts, picowatts',
    index: true,
		emptyOption: true,
  },
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

PowerSpecification.relationship({ ref: 'Microcontroller', path: 'microcontrollers', refPath: 'supplyCurrentUnit' });

PowerSpecification.defaultColumns = 'value, unit|20%, createdBy|20%, createdAt|20%';
PowerSpecification.register();
