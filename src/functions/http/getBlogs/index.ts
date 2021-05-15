import { handlerPath } from '@libs/handlerResolver';

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			http: {
				method: 'get',
				path: 'blogs',
				cors: true,
			},
		},
	],
	iamRoleStatements: [
		{
			Effect: 'Allow',
			Action: ['dynamodb:Scan'],
			Resource:
				'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.BLOGS_TABLE}',
		},
	],
};
