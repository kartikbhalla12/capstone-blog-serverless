import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { getBlog, getUserBlog } from '@businessLogic/blogs';
import { parseUserId } from '@auth/utils';
import { BlogItem } from './../../../models/blogItem';

const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
	const authorizationHeader = event.headers.Authorization;
	const jwtToken = authorizationHeader.split(' ')[1];

	const userId = parseUserId(jwtToken);
	const blogId = event.pathParameters.blogId;

	let blog: BlogItem;

	const self = event.queryStringParameters?.self;

	if (self && Boolean(JSON.parse(self)))
		blog = await getUserBlog(userId, blogId);
	else blog = await getBlog(userId, blogId);

	console.log(blog);

	if (!blog) return formatJSONResponse({}, 400);

	return formatJSONResponse({ item: blog }, 200);
};

export const main = middyfy(handler);
