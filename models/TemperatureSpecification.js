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
	value: { type: Types.Text },
	unit: {
    type: Types.Select,
    options: 'F, C, K',
    emptyOption: true,
    index: true
  },
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

EnergySpecification.schema.virtual('description.full').get(function () {
	return this.description.extended || this.description.brief;
});

EnergySpecification.relationship({ ref: 'Microcontroller', path: 'microcontrollers', refPath: 'activePower' });
EnergySpecification.relationship({ ref: 'Microcontroller', path: 'microcontrollers', refPath: 'sleepPower' });

EnergySpecification.defaultColumns = 'value, unit|20%, createdBy|20%, createdAt|20%';
EnergySpecification.register();
