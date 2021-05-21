import { handlerPath } from '@libs/handlerResolver';

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			http: {
				method: 'get',
				path: 'blogs/updateImageUrl/{blogId}',
				cors: true,
				authorizer: 'auth',
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
		{
			Effect: 'Allow',
			Action: ['s3:PutObject', 's3:GetObject'],
			Resource:
				'arn:aws:s3:::${self:provider.environment.BLOGS_IMAGE_BUCKET}/*',
		},
	],
};
