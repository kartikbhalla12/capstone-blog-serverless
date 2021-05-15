import { handlerPath } from '@libs/handlerResolver';

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			http: {
				method: 'get',
				path: 'user/blogs',
				cors: true,
			},
		},
	],
	iamRoleStatements: [
		{
			Effect: 'Allow',
			Action: ['dynamodb:Query'],
			Resource:
				'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.BLOGS_TABLE}/index/${self:provider.environment.BLOGS_USER_ID_INDEX}',
		},
	],
};
