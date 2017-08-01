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
    options: 'unknown, 4 bit, 8 bit, 16 bit, 24 bit, 32 bit, 64 bit, other',
		emptyOption: true,
    index: true,
  },
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

MemoryBitSpecification.relationship({ ref: 'Microcontroller', path: 'microcontrollers', refPath: 'dataBus' });

MemoryBitSpecification.defaultColumns = 'value, unit|20%, createdBy|20%, createdAt|20%';
MemoryBitSpecification.register();
