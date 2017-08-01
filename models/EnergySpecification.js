var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * EnergySpecification Model
 * ==========
 */

var EnergySpecification = new keystone.List('EnergySpecification', {
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

EnergySpecification.add({
	frequency: {
		type: Types.Relationship,
		ref:'FrequencySpecification',
		createInline: true,
		initial: true, required: true
	},
	current: {
		type: Types.Relationship,
		ref:'CurrentSpecification',
		createInline: true,
		initial: true, required: true
	},
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

EnergySpecification.relationship({ ref: 'Microcontroller', path: 'microcontrollers', refPath: 'activePower' });
EnergySpecification.relationship({ ref: 'Microcontroller', path: 'microcontrollers', refPath: 'sleepPower' });

EnergySpecification.defaultColumns = 'frequency, current|20%, createdBy|20%, createdAt|20%';
EnergySpecification.register();
