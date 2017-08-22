var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ContactProbe Model
 * ==========
 */

var ContactProbe = new keystone.List('ContactProbe', {
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

ContactProbe.add({
	type: {
		type: Types.Select,
		options: 'contacts, pins, probes, receptacles, tools',
		emptyOptions: true
	},
  title: { type: Types.Text, required: true, index: true, initial: true },
	manufacturer: { type: Types.Relationship, ref: 'ContactProbeManufacturer', many: false, createInline: true },
	manufacturerPartNumber: { type: Types.Text },
  heroImage: { type: Types.CloudinaryImage, collapse: true },
	series: { type: Types.Text },
	length: { type: Types.Number, note: 'in (mm)' },
	springForce: { type: Types.Text },
	tipStyles: {
		type: Types.Select,
		options: 'arrowhead, blade, chisel, concave, conical, convex, crown, flat, needle, serrated, spear, spherical radius, star, tri-needle, tulip',
		emptyOptions: true
	},
	workingTravel: { type: Types.Number, note: 'in (mm)' },
	fullTravel: { type: Types.Number, note: 'in (mm)' },
	center: { type: Types.Number, note: 'in (mm)' },
	currentResistance: { type: Types.Number, note: 'in (amps)' },
	description: {
		brief: { type: Types.Textarea, height: 150, initial: true },
		extended: { type: Types.Textarea, height: 400 }
	},
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

ContactProbe.relationship({ ref: 'TestFixture', path: 'test-fixtures', refPath: 'contactProbes' });

ContactProbe.schema.virtual('description.full').get(function () {
	return this.description.extended || this.description.brief;
});

ContactProbe.defaultColumns = 'title, state|20%, createdBy|20%, createdAt|20%';
ContactProbe.register();
