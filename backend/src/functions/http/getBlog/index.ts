import { handlerPath } from '@libs/handlerResolver';

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			http: {
				method: 'get',
				path: 'blogs/{blogId}',
				cors: true,
				authorizer: 'auth',
				request: {
					parameters: {
						querystrings: {
							self: false,
						},
					},
				},
			},
		},
	],

	iamRoleStatements: [
		{
			Effect: 'Allow',
			Action: ['dynamodb:Scan', 'dynamodb:Query'],
			Resource:
				'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.BLOGS_TABLE}',
		},
		{
			Effect: 'Allow',
			Action: ['dynamodb:Scan'],
			Resource:
				'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.BLOGS_TABLE}/index/${self:provider.environment.BLOGS_ID_INDEX}',
		},
	],
};
