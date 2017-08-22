var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Test Model
 * ==========
 */

var Test = new keystone.List('Test', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Test.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	videoLinks: { type: Types.Relationship, ref: 'TestVideoLink', note: 'Link to a hosted video of the test.', many: true, createInline: true },
	type: { type: Types.Select, options: 'microcontroller, single board computer, sensor', emptyOption: true, index: true },
	microcontroller: { type: Types.Relationship, ref: 'Microcontroller', dependsOn: { type: 'microcontroller'}, createInline: true },
	sbc: { type: Types.Relationship, label: 'Single Board Computer', ref: 'SingleBoardComputer', dependsOn: { type: 'single board computer'}, createInline: true },
	sensor: { type: Types.Relationship, ref: 'Sensor', dependsOn: { type: 'sensor'}, createInline: true },
	testFixture: { type: Types.Relationship, ref: 'TestFixture', createInline: true },
	codeRepositoryUrl: { type: Types.Url, 'label': 'Source Code Repo URL' },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, initial: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'TestCategory', many: true },
});

Test.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Test.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Test.register();
