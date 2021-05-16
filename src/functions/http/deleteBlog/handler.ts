import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { deleteUserBlog } from '@businessLogic/blogs';
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { parseUserId } from '@auth/utils';

const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
	const blogId = event.pathParameters.blogId;
	const authorizationHeader = event.headers.Authorization;
	const jwtToken = authorizationHeader.split(' ')[1];

	const userId = parseUserId(jwtToken);

	try {
		const deletedBlog = await deleteUserBlog(blogId, userId);
		return formatJSONResponse({ item: deletedBlog }, 200);
	} catch (ex) {
		return formatJSONResponse({}, 400);
	}
};

export const main = middyfy(handler);
