var keystone = require('keystone');
var Types = keystone.Field.Types;
var randToken = require('rand-token');

/**
 * DUTFile Model
 * ==========
 */

var DUTFile = new keystone.List('DUTFile', {
	label: 'Device Under Test (DUT) File',
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
	autokey: { path: 'slug', from: 'key', unique: true }
});

// TODO: Look into possibly upgrading this with
// Multi file upload: https://github.com/davidtsuji/sg-upload-to-s3.
var AWSStorage = new keystone.Storage({
	adapter: require('keystone-storage-adapter-s3'),
	s3: {
		key: process.env.AMAZON_KEY, // required; defaults to process.env.S3_KEY
		secret: process.env.AMAZON_SECRET, // required; defaults to process.env.S3_SECRET
		bucket: process.env.AMAZON_BUCKET, // required; defaults to process.env.S3_BUCKET
		region: process.env.S3_REGION, // optional; defaults to process.env.S3_REGION, or if that's not specified, us-east-1
		path: '/duts',
		headers: {
			'x-amz-acl': 'public-read' // add default headers; see below for details
		},
		generateFilename: keystone.Storage.originalFilename
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

DUTFile.add({
	title: { type: Types.Text, hidden: true, index: true },
	file: {
		type: Types.File,
		storage: AWSStorage,
		note: 'Upload dependencies.',
		initial: true,
		createInline: true,
		allowedTypes: ['tar','gzip','zip','xz','gz','bz2']
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
	version: { type: Types.Number, default: 1, hidden: true },
	url: { type: Types.Url, note:'The source URL.', initial: true },
	description: { type: Types.Textarea, height: 50 },
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived, spam', default: 'published', index: true }
});

DUTFile.schema.pre('save', function (next) {
	var self = this;
	// Use the original filename as the title.
	if(this.file.filename){
		self.title = this.file.filename;
	} else {
		self.title = randToken.generate(16);
	}
	DUTFile.model.findOne({
		title: self.title,
	})
	.where('state','published')
	.sort('-updatedAt')
	.exec(function(err, existing) {
		if(err) {
			console.log('ERROR: DUTFile - There was an error finding the benchmark file during pre save.');
		}
		if(existing) {
			// Increase the version
			version = parseInt(existing.version + 1);
			self.title = self.title + '_v' + version;
			self.version = version;
		}
		next();
	});
});

DUTFile.relationship({ ref: 'Microcontroller', path: 'microcontrollers', refPath: 'files' });
// DUTFile.relationship({ ref: 'Sensor', path: 'sensors', refPath: 'files' });
// DUTFile.relationship({ ref: 'Chip', path: 'chips', refPath: 'files' });

DUTFile.defaultColumns = 'title|20%, service|20%, createdBy|20%, state|20%';
DUTFile.register();
