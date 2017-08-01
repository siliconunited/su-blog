var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * MemorySpecification Model
 * ==========
 */

var MemorySpecification = new keystone.List('MemorySpecification', {
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

MemorySpecification.add({
	value: { type: Types.Number, initial: true, required: true },
	unit: {
    type: Types.Select,
    options: 'bit, Byte, KB, MB, GB, TB, Mbit, Kbit',
		emptyOption: true,
    index: true,
		initial: true, required: true
  },
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

MemorySpecification.defaultColumns = 'value, unit|20%, createdBy|20%, createdAt|20%';
MemorySpecification.register();
