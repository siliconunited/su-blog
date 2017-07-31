var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * PowerSavingMode Model
 * ==========
 */

var PowerSavingMode = new keystone.List('PowerSavingMode', {
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

PowerSavingMode.add({
  title: { type: Types.Text, required: true, index: true, initial: true },
	description: {
		brief: { type: Types.Textarea, height: 150, initial: true },
		extended: { type: Types.Textarea, height: 400 }
	},
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

PowerSavingMode.schema.virtual('description.full').get(function () {
	return this.description.extended || this.description.brief;
});

PowerSavingMode.relationship({ ref: 'Microcontroller', path: 'microcontrollers', refPath: 'powerSavingModes' });

PowerSavingMode.defaultColumns = 'title, state|20%, createdBy|20%, createdAt|20%';
PowerSavingMode.register();
