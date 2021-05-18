import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			http: {
				method: 'post',
				path: 'blogs',
				cors: true,
				request: {
					schema: {
						'application/json': schema,
					},
				},
				authorizer: 'auth',
			},
		},
	],
	iamRoleStatements: [
		{
			Effect: 'Allow',
			Action: ['dynamodb:PutItem'],
			Resource:
				'arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.BLOGS_TABLE}',
		},
		{
			Effect: 'Allow',
			Action: ['s3:PutObject', 's3:GetObject'],
			Resource:
				'arn:aws:s3:::${self:provider.environment.BLOGS_IMAGE_BUCKET}/*',
		},
	],
};
