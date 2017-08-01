var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * CurrentSpecification Model
 * ==========
 */

var CurrentSpecification = new keystone.List('CurrentSpecification', {
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

CurrentSpecification.add({
	value: { type: Types.Number },
	unit: {
    type: Types.Select,
    options: 'amps (A), kiloamps (kA), milliamps (mA), microamps (μA), nanoamps (nA), picoamps (pA), femptoamps (fA)',
    index: true,
		emptyOption: true,
  },
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

CurrentSpecification.relationship({ ref: 'EnergySpecification', path: 'energy-specifications', refPath: 'current' });
CurrentSpecification.relationship({ ref: 'Microcontroller', path: 'microcontrollers', refPath: 'supplyCurrentUnit' });

CurrentSpecification.defaultColumns = 'value, unit|20%, createdBy|20%, createdAt|20%';
CurrentSpecification.register();
