var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * TestVideoLink Model
 * ==========
 */

var TestVideoLink = new keystone.List('TestVideoLink', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

TestVideoLink.add({
	title: { type: String, required: true },
	url: { type: Types.Url, required: true, label: 'URL', initial: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, initial: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
});

TestVideoLink.relationship({ ref: 'Test', path: 'tests', refPath: 'videoLinks' });

TestVideoLink.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

TestVideoLink.defaultColumns = 'url, state|20%, author|20%, publishedDate|20%';
TestVideoLink.register();
