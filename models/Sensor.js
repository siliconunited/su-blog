var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Sensor Model
 * ==========
 */

var Sensor = new keystone.List('Sensor', {
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

Sensor.add({
  manufacturer: { type: Types.Relationship, ref: 'SensorManufacturer', many: false, initial: true, createInline: true },
  title: { type: Types.Text, required: true, index: true, initial: true },
  mpn: { type: Types.Text, required: true, index: true, initial: true, label: 'Manufacturer Part #' },
  type: { type: Types.Relationship, ref:'SensorType', required: true, index: true, initial: true, createInline: true },
  releaseDate: { type: Types.Date },
  introPrice: { type: Types.Money },
	heroImage: { type: Types.CloudinaryImage },
  operatingRange: { type: Types.Relationship, ref:'OperatingRange', createInline: true, required: true, initial: true, index: true },
	rohsStatus: { type: Types.Select, label:'RoHS Status', options: 'RoHS Compliant, Non-RoHS Compliant', emptyOption: true, index: true },
	partStatus: { type: Types.Select, options: 'active, discontinued, obsolete', default: 'active', index: true },
	url: { type: Types.Url },
	purchaseUrl: { type: Types.Url },
	features: {
		brief: { type: Types.Html, height: 150, wysiwyg: true },
		extended: { type: Types.Html, height: 400, wysiwyg: true }
	},
	specialFeatures: {
		brief: { type: Types.Html, label: 'Special Features', height: 150, wysiwyg: true },
		extended: { type: Types.Html, label: 'Special Features', height: 400, wysiwyg: true }
	},
	description: {
		brief: { type: Types.Textarea, initial: true, height: 150 },
		extended: { type: Types.Textarea, height: 400 }
	},
  lifeCycleStage: {
		type: Types.Relationship,
		ref: 'LifeCycleSpecification',
    note: 'The current product lifecycle stage, as defined by <a href="http://www.globalspec.com/SpecSearch/SearchForm/semiconductors/microprocessors_microcontrollers/microcontrollers#cb_Life_Cycle_Stage" target="_blank">EIA-724</a>.',
    index: true
  },
	supplyVoltage: {
		type: Types.Relationship,
		ref: 'VoltageSpecification',
		label: 'Supply Voltage (Vcc)',
    note: 'The value as specified by level (Min-Typ-Max) of the direct supply voltage, applied to an IC.',
    index: true
  },
	supplyCurrent: {
		type: Types.Relationship,
		ref: 'CurrentSpecification',
    note: 'The continuous current (in A) required by this item during normal operation.',
    index: true
  },
	powerDissipation: {
		type: Types.Relationship,
		ref: 'PowerSpecification',
    note: 'The maximum permissible power dissipation per output (in W) of this item at specified ambient temperature.',
    index: true
  },
	operatingTemperature: {
		type: Types.Relationship,
		ref:'TemperatureSpecification',
		label: 'Operating Temperature',
		note: 'The value as specified by level (Min-Typ-Max) of the ambient temperature (in degree Celsius) in which this microcontroller was designed to operate.',
		createInline: true,
		many: true
	},
	activePower: {
		type: Types.Relationship,
		ref:'EnergySpecification',
		label: 'Active Power',
		many: true,
		index: true,
		createInline: true,
	},
	sleepPower: {
		type: Types.Relationship,
		ref:'EnergySpecification',
		label: 'Sleep Power',
		many: true,
		index: true,
		createInline: true,
	},
	output: { type: Types.Text },
	operatingVoltage: { type: Types.Text },
	operatingFrequency: { type: Types.Text },
	powerSavingModes: { type: Types.Relationship, ref:'PowerSavingMode', label: 'Power Saving Modes', many: true, index: true },
  // supportedPlatforms: { type: Types.Relationship, ref:'Platform', createInline: true, required: true, initial: true, many: true, index: true },
	images: { type: Types.CloudinaryImages },
	datasheets: { type: Types.Relationship, ref:'Datasheet', many: true },
	files: { type: Types.Relationship, ref:'DUTFile', many: true },
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

Sensor.schema.virtual('description.full').get(function () {
	return this.description.extended || this.description.brief;
});

Sensor.defaultColumns = 'title, state|20%, createdBy|20%, createdAt|20%';
Sensor.register();
