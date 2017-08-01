var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * LifeCycleSpecification Model
 * ==========
 */

var LifeCycleSpecification = new keystone.List('LifeCycleSpecification', {
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

LifeCycleSpecification.add({
	value: { type: Types.Number, initial: true, required: true },
	unit: {
    type: Types.Select,
    options: 'unknown, introduction, new product, rapid growth, maturity, saturation, not recomended (declining), phase out, removed',
    index: true,
		emptyOption: true,
		initial: true, required: true
  },
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

LifeCycleSpecification.relationship({ ref: 'Microcontroller', path: 'microcontrollers', refPath: 'lifeCycleStage' });

LifeCycleSpecification.defaultColumns = 'value, unit|20%, createdBy|20%, createdAt|20%';
LifeCycleSpecification.register();
