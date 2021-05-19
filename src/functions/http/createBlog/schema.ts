export default {
	type: 'object',
	properties: {
		name: { type: 'string' },
		heading: { type: 'string' },
		description: { type: 'string' },
		content: { type: 'object' },
		timeToRead: { type: 'string' },
		authorName: { type: 'string' },
	},
	required: ['heading', 'description', 'content', 'timeToRead', 'authorName'],
} as const;
