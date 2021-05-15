import type { AWS } from '@serverless/typescript';

import {
	hello,
	getBlogs,
	createBlog,
	getUserBlogs,
	updateUserBlog,
} from '@functions/http';

const serverlessConfiguration: AWS = {
	service: 'blog',
	frameworkVersion: '2',
	custom: {
		webpack: {
			webpackConfig: './webpack.config.js',
			includeModules: true,
		},
		'serverless-offline': {
			port: 3003,
		},

		dynamodb: {
			start: {
				port: 8000,
				inMemory: true,
				migrate: true,
			},
			stages: ['dev'],
		},
	},
	plugins: [
		'serverless-webpack',
		'serverless-iam-roles-per-function',
		'serverless-offline',
		'serverless-dynamodb-local',
	],
	provider: {
		name: 'aws',
		runtime: 'nodejs14.x',

		stage: "${opt:stage, 'dev'}",
		// @ts-ignore
		region: "${opt:region, 'ap-south-1'}",

		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			BLOGS_TABLE: 'Blogs-${self:provider.stage}',
			BLOGS_IMAGE_BUCKET: 'blogs-kartik-images-${self:provider.stage}',
			BLOGS_USER_ID_INDEX: 'BlogsUserIdIndex',
		},
		lambdaHashingVersion: '20201221',
	},
	// import the function via paths
	functions: { hello, getBlogs, createBlog, getUserBlogs, updateUserBlog },

	resources: {
		Resources: {
			BlogsDynamoDBTable: {
				Type: 'AWS::DynamoDB::Table',
				Properties: {
					AttributeDefinitions: [
						{ AttributeName: 'blogId', AttributeType: 'S' },
						{ AttributeName: 'userId', AttributeType: 'S' },
					],
					KeySchema: [
						// { AttributeName: 'userId', KeyType: 'HASH' },
						// { AttributeName: 'blogId', KeyType: 'RANGE' },
						{ AttributeName: 'blogId', KeyType: 'HASH' },
					],
					GlobalSecondaryIndexes: [
						{
							IndexName: '${self:provider.environment.BLOGS_USER_ID_INDEX}',
							KeySchema: [
								{ AttributeName: 'userId', KeyType: 'HASH' },
								{ AttributeName: 'blogId', KeyType: 'RANGE' },
							],
							Projection: { ProjectionType: 'ALL' },
						},
					],

					BillingMode: 'PAY_PER_REQUEST',
					TableName: '${self:provider.environment.BLOGS_TABLE}',
				},
			},
			BlogsImageBucket: {
				Type: 'AWS::S3::Bucket',
				Properties: {
					BucketName: '${self:provider.environment.BLOGS_IMAGE_BUCKET}',
					CorsConfiguration: {
						CorsRules: [
							{
								AllowedOrigins: ['*'],
								AllowedHeaders: ['*'],
								AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
								MaxAge: '3000',
							},
						],
					},
				},
			},

			BlogsImageBucketPolicy: {
				Type: 'AWS::S3::BucketPolicy',
				Properties: {
					PolicyDocument: {
						Id: 'MyPolicy',
						Version: '2012-10-17',
						Statement: [
							{
								Sid: 'PublicReadForGetBucketObjects',
								Effect: 'Allow',
								Principal: '*',
								Action: 's3:GetObject',
								Resource:
									'arn:aws:s3:::${self:provider.environment.BLOGS_IMAGE_BUCKET}/*',
							},
						],
					},
					Bucket: {
						Ref: 'BlogsImageBucket',
					},
				},
			},
		},
	},
};

module.exports = serverlessConfiguration;
