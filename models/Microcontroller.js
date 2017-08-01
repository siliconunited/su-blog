var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Microcontroller Model
 * ==========
 */

var Microcontroller = new keystone.List('Microcontroller', {
	track: {
		createdBy: true,
		updatedBy: true,
		createdAt: true,
		updatedAt: true
	},
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

Microcontroller.add({
  manufacturer: { type: Types.Relationship, ref: 'Manufacturer', many: false, createInline: true },
  title: { type: Types.Text, required: true, index: true, initial: true },
	heroImage: { type: Types.CloudinaryImage },
	icPackageType: { type: Types.Relationship, ref:'ICPackageType', label: 'IC Package Type', createInline: true, required: true, initial: true, index: true },
  operatingRange: { type: Types.Relationship, ref:'OperatingRange', createInline: true, required: true, initial: true, index: true },
  programMemoryTypes: { type: Types.Relationship, ref:'MemoryType', createInline: true, many: true, required: true, initial: true, index: true },
  programmingLanguageSupport: { type: Types.Relationship, ref:'ProgrammingLanguage', label: 'Programming Languages Supported', createInline: true, many: true, required: true, initial: true, index: true },
  architecture: { type: Types.Relationship, ref:'MicrocontrollerArchitecture', label: 'Architecture', createInline: true, index: true },
	CPUCount: {
    type: Types.Number,
		label: 'Central Processor Unit (CPU) Count',
  },
	cpus: { type: Types.Relationship, ref:'CPU', createInline: true, required: true, initial: true, many: true, index: true },
	url: { type: Types.Url },
	purchaseUrl: { type: Types.Url },
	features: {
		brief: { type: Types.Html, height: 150, initial: true, wysiwyg: true },
		extended: { type: Types.Html, height: 400, wysiwyg: true }
	},
	ioAndPackages: {
		brief: { type: Types.Html, label: 'I/O and packages', height: 150, initial: true, wysiwyg: true },
		extended: { type: Types.Html, label: 'I/O and packages', height: 400, wysiwyg: true }
	},
	peripheralFeatures: {
		brief: { type: Types.Html, label: 'Peripheral Features', height: 150, initial: true, wysiwyg: true },
		extended: { type: Types.Html, label: 'Peripheral Features', height: 400, wysiwyg: true }
	},
	specialFeatures: {
		brief: { type: Types.Html, label: 'Special Features', height: 150, initial: true, wysiwyg: true },
		extended: { type: Types.Html, label: 'Special Features', height: 400, wysiwyg: true }
	},
	description: {
		brief: { type: Types.Textarea, height: 150, initial: true },
		extended: { type: Types.Textarea, height: 400 }
	},
  dataBus: {
		type: Types.Relationship,
		ref: 'MemoryBitSpecification',
    note: 'The number of bits the data bus can transfer at the same time. A bidirectional set of conductive paths on which data or instruction codes are transferred into the DSP, or on which the result of an operation or computation is sent out from the DSP.',
    index: true
  },
  lifeCycleStage: {
		type: Types.Relationship,
		ref: 'LifeCycleSpecification',
    note: 'The current product lifecycle stage, as defined by <a href="http://www.globalspec.com/SpecSearch/SearchForm/semiconductors/microprocessors_microcontrollers/microcontrollers#cb_Life_Cycle_Stage" target="_blank">EIA-724</a>.',
    index: true
  },
  clockSpeed: {
		type: Types.Relationship,
		ref: 'FrequencySpecification',
    index: true
  },
	numberOfInterupts: { type: Types.Text },
	internalRAM: {
		type: Types.Relationship,
		ref: 'MemorySpecification',
    note: 'Random access memory (RAM) can be read from or written to in a nonlinear manner. RAM derives its name from the fact that any byte of memory can be accessed randomly instead of sequentially. RAM does not retain data in memory when power is removed.',
    index: true
  },
	internalROM: {
		type: Types.Relationship,
		ref: 'MemorySpecification',
    note: 'Read-only memory (ROM) contains pre-programmed data and is either unchangeable or requires a special operation to overwrite. ROM retains data in memory when power is removed. A photosensitive material is etched to hold the required bit pattern.',
    index: true
  },
	internalROMType: {
		type: Types.Relationship,
		ref: 'MemoryType',
    note: 'The type of the on-chip instruction ROM.',
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
	timerBits: {
		type: Types.Relationship,
		ref: 'MemoryBitSpecification',
    note: 'The number of bits of the timer.',
    index: true
  },
	timerCount: { type: Types.Number, label: 'Number of Timers' },
	serialInterfaces: {
    type: Types.Select,
    options: 'unknown, CAN, I²C, SPI, SCI, UART, USART, USB, other',
    note: 'The serial interface type(s), and the number of channels provided.',
    emptyOption: true,
		many: true,
    index: true
  },
	serialPortChannelCount: { type: Types.Number, label: 'Serial Port Channels' },
	ioPortChannelCount: { type: Types.Number, label: 'Number of I/O Ports' },
	adConverter: {
		type: Types.Relationship,
		ref: 'MemorySpecification',
		label: 'A/D Converter',
    note: 'The resolution of the A/D converter.',
    index: true
  },
	pinCount: { type: Types.Number, label: 'Pin Count' },
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
	operatingVoltage: { type: Types.Textarea },
	operatingFrequency: { type: Types.Textarea },
	hasWatchdogTimer: {
    type: Types.Boolean,
		label: 'Watchdog Timer',
		note: 'A watchdog timer is a simple countdown timer, which is used to reset a microprocessor after a specific interval of time.'
  },
	DMAChannelCount: {
    type: Types.Number,
		label: 'Direct Memory Access Channel Count',
		note: 'Direct Memory Access (DMA is a technique for transferring data directly between two peripherals (usually memory and an I/O device) with only minimal intervention by the processor.'
  },
	PWMChannelCount: {
		type: Types.Number,
		label: 'Pulse Width Modulation Channel Count',
		note: 'Pulse Width Modulation (PWM) is a technique for controlling analog circuits with a processor\'s digital outputs. PWM is employed in a wide range of applications, from measurement and communications to power control and conversion.'
  },
	powerSavingModes: { type: Types.Relationship, ref:'PowerSavingMode', label: 'Power Saving Modes', many: true, index: true },
	hasOSG: {
    type: Types.Boolean,
		label: 'Oscillator Safeguard (OSG)',
		note: 'The Oscillator Safeguard (OSG) feature provides the following functions to the MCU: Filters spikes in the oscillator lines, Manages the Low Frequency Auxiliary Oscillator (LFAO), and Automatically limits the internal frequency (fINT) clock frequency as a function of supply voltage.'
  },
	hasLFAO: {
    type: Types.Boolean,
		label: 'Low Frequency Auxiliary Oscillator (LFAO)',
		note: 'A backup oscillator.'
  },
	hasLVD: {
    type: Types.Boolean,
		label: 'Low Voltage Detector (LVD)',
		note: 'The Low Voltage Detector (LVD) allows the MCU to be used without any external RESET circuitry. If the LVD is not used, an external circuit is mandatory to ensure correct Power On Reset operation.'
  },
	hasReadoutDetection: {
    type: Types.Boolean,
		label: 'Readout Protection',
		note: 'The Readout Protection feature is used to protect the program memory against external readout. Once the Readout Protection is active, it is no longer possible to gain access to the OTP or ROM content.'
  },
	hasLCDDriver: {
    type: Types.Boolean,
		label: 'LCD Driver',
		note: 'A feature used to connect and control external LCDs.'
  },
	hasDAC: {
    type: Types.Boolean,
		label: 'Digial-to-Analog Converter (DAC)',
		note: 'A less common feature on some microcontrollers is a digital-to-analog converter (DAC) that allows the processor to output analog signals or voltage levels.'
  },
	hasPIT: {
    type: Types.Boolean,
		label: 'Programmable Interval Timer (PIT)',
		note: 'One of the most common types of timers is the Programmable Interval Timer (PIT). A PIT may either count down from some value to zero, or up to the capacity of the count register, overflowing to zero.'
  },
	hasWifi: {
    type: Types.Boolean,
		label: 'Wi-Fi',
		note: 'Wi-Fi microcontrollers enable Wi-Fi connectivity for devices so that they can send & receive data and accept commands.'
  },
	hasInCircuitProgramming: {
    type: Types.Boolean,
		label: 'In-circuit Programming Available',
		note: ''
  },
	hasInCircuitDebugging: {
    type: Types.Boolean,
		label: 'In-circuit Debugging Available',
		note: ''
  },
  supportedPlatforms: { type: Types.Relationship, ref:'Platform', createInline: true, required: true, initial: true, many: true, index: true },
	images: { type: Types.CloudinaryImages },
	datasheets: { type: Types.Relationship, ref:'Datasheet', many: true },
	files: { type: Types.Relationship, ref:'DUTFile', many: true },
	notes: { type: Types.Textarea, height: 150 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'published', index: true }
});

Microcontroller.schema.virtual('description.full').get(function () {
	return this.description.extended || this.description.brief;
});

Microcontroller.defaultColumns = 'title, state|20%, createdBy|20%, createdAt|20%';
Microcontroller.register();
