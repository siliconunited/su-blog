var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * MicrocontrollerArchitecture Model
 * ==========
 */

var MicrocontrollerArchitecture = new keystone.List('MicrocontrollerArchitecture', {
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

MicrocontrollerArchitecture.add({
  title: { type: Types.Text, required: true, index: true, initial: true },
	description: {
		brief: { type: Types.Textarea, height: 150, initial: true },
		extended: { type: Types.Textarea, height: 400 }
	},
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

MicrocontrollerArchitecture.schema.virtual('description.full').get(function () {
	return this.description.extended || this.description.brief;
});

MicrocontrollerArchitecture.relationship({ ref: 'Microcontroller', path: 'microcontrollers', refPath: 'architecture' });

MicrocontrollerArchitecture.defaultColumns = 'title, state|20%, createdBy|20%, createdAt|20%';
MicrocontrollerArchitecture.register();
