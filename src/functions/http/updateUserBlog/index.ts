import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			http: {
				method: 'patch',
				path: 'user/blogs/{blogId}',
				cors: true,
				request: {
					schema: {
						'application/json': schema,
					},
				},
			},
		},
	],
	iamRoleStatements: [
		{
			Effect: 'Allow',
			Action: ['dynamodb:UpdateItem'],
			Resource:
				'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.BLOGS_TABLE}',
		},
	],
};
