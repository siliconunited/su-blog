var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * MemoryBitSpecification Model
 * ==========
 */

var MemoryBitSpecification = new keystone.List('MemoryBitSpecification', {
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

MemoryBitSpecification.add({
	value: { type: Types.Number },
	unit: {
    type: Types.Select,
    options: 'bit, Byte, KB, MB, GB, TB, Mbit, Kbit',
		emptyOption: true,
    index: true,
  },
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

MemoryBitSpecification.defaultColumns = 'value, unit|20%, createdBy|20%, createdAt|20%';
MemoryBitSpecification.register();
