export default {
	type: 'object',
	properties: {
		authorName: { type: 'string' },
		heading: { type: 'string' },
		description: { type: 'string' },
		content: { type: 'object' },
		timeToRead: { type: 'number' },
	},
	required: ['authorName', 'heading', 'description', 'content', 'timeToRead'],
} as const;
