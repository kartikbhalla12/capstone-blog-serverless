export default {
	type: 'object',
	properties: {
		name: { type: 'string' },
		heading: { type: 'string' },
		subHeading: { type: 'string' },
		content: { type: 'string' },
		timeToRead: { type: 'string' },
	},
	required: ['heading', 'subHeading', 'content', 'timeToRead'],
} as const;
