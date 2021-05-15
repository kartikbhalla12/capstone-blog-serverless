import * as AWS from 'aws-sdk';
import { createLogger } from '@utils/logger';
import { BlogItem } from './../models/blogItem';

const logger = createLogger('todo');

export class BlogAccess {
	constructor(
		private readonly docClient = BlogAccess.createDynamoDBClient(),
		private readonly blogsTable = process.env.BLOGS_TABLE,
		private readonly blogsUserIdIndex = process.env.BLOGS_USER_ID_INDEX
	) {}

	async getBlogs(userId: string): Promise<BlogItem[]> {
		const result = await this.docClient
			.scan({
				TableName: this.blogsTable,
				FilterExpression: 'userId <> :userId', // Not equal to userId
				ExpressionAttributeValues: {
					':userId': userId,
				},
			})
			.promise();

		logger.info(result);
		return result.Items as BlogItem[];
	}

	async getUserBlogs(userId: string): Promise<BlogItem[]> {
		const result = await this.docClient
			.query({
				TableName: this.blogsTable,
				IndexName: this.blogsUserIdIndex,
				KeyConditionExpression: 'userId = :userId',
				ExpressionAttributeValues: {
					':userId': userId,
				},
			})
			.promise();

		logger.info(result);
		return result.Items as BlogItem[];
	}
	async updateUserBlog(
		userId: string,
		blogId: string,
		blogRequest: BlogRequest
	): Promise<BlogItem> {
		const result = await this.docClient
			.update({
				TableName: this.blogsTable,
				ConditionExpression: 'userId = :userId',
				Key: { blogId },
				UpdateExpression:
					'set heading = :heading, subHeading = :subHeading, updatedAt = :updatedAt, content = :content, timeToRead = :timeToRead',
				ExpressionAttributeValues: {
					':heading': blogRequest.heading,
					':subHeading': blogRequest.subHeading,
					':updatedAt': new Date().toISOString(),
					':content': blogRequest.content,
					':timeToRead': blogRequest.timeToRead,
					':userId': userId,
				},
				ReturnValues: 'ALL_NEW',
			})
			.promise();

		logger.info(result);
		return result.Attributes as BlogItem;
	}

	async createBlog(blogItem: BlogItem): Promise<BlogItem> {
		const result = await this.docClient
			.put({
				TableName: this.blogsTable,
				Item: blogItem,
			})
			.promise();

		logger.info(result);
		return blogItem;
	}

	static createDynamoDBClient() {
		if (process.env.IS_OFFLINE) {
			logger.info('Running DynamoDB locally!');

			return new AWS.DynamoDB.DocumentClient({
				region: 'localhost',
				endpoint: 'http://localhost:8000',
			});
		}

		return new AWS.DynamoDB.DocumentClient();
	}
}
