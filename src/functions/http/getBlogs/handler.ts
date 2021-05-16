import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { getBlogs, getUserBlogs } from '@businessLogic/blogs';
import { BlogItem } from '@models/blogItem';
import { parseUserId } from '@auth/utils';

const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
	const authorizationHeader = event.headers.Authorization;
	const jwtToken = authorizationHeader.split(' ')[1];

	const userId = parseUserId(jwtToken);

	let blogs: BlogItem[];

	const self = event.queryStringParameters?.self;

	if (self && Boolean(JSON.parse(self))) blogs = await getUserBlogs(userId);
	else blogs = await getBlogs(userId);

	return formatJSONResponse({ items: blogs }, 200);
};

export const main = middyfy(handler);
