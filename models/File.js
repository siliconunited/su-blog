var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * File Model
 * ==========
 */

var File = new keystone.List('File', {
	label: 'File',
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
	map: { name: 'key' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

// TODO: Do some sort of pre-save and generate the path for the file?
// Use case:
// If the file is being added to a test, should go to a specific folder for the test.
//

var AWSStorage = new keystone.Storage({
	adapter: require('keystone-storage-adapter-s3'),
	s3: {
		key: process.env.AMAZON_KEY, // required; defaults to process.env.S3_KEY
		secret: process.env.AMAZON_SECRET, // required; defaults to process.env.S3_SECRET
		bucket: process.env.AMAZON_BUCKET, // required; defaults to process.env.S3_BUCKET
		region: process.env.S3_REGION, // optional; defaults to process.env.S3_REGION, or if that's not specified, us-east-1
		// path: '/benchmarks/', // TODO: See TODO above.
		headers: {
			'x-amz-acl': 'public-read' // add default headers; see below for details
		}
	},
	schema: {
		size: true,
		mimetype: true,
		bucket: true, // optional; store the bucket the file was uploaded to in your db
		etag: true, // optional; store the etag for the resource
		path: true, // optional; store the path of the file in your db
		url: true // optional; generate & store a public URL
	}
});

File.add({
	title: { type: Types.Text, hidden: true },
	file: {
		type: Types.File,
		storage: AWSStorage,
		note: 'Upload dependencies.',
		initial: true,
		required: true
	},
	service: {
		type: Types.Select,
		default: 'aws-s3',
		options: [
			{ value: 'aws-s3', label: 'Amazon Web Services: S3' }
		],
		hidden: true,
		required: true
	},
	url: { type: Types.Url },
	description: { type: Types.Textarea, height: 50 },
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived, spam', default: 'published', index: true }
});

File.defaultColumns = 'file|20%, service|20%, createdBy|20%, state|20%';
File.register();
