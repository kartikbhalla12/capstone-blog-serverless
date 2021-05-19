import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { getUpdateImageUrl } from '@businessLogic/blogs';
import { parseUserId } from '@auth/utils';

const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
	const authorizationHeader = event.headers.Authorization;
	const jwtToken = authorizationHeader.split(' ')[1];

	const userId = parseUserId(jwtToken);
	const blogId = event.pathParameters.blogId;

	let updateUrl: string;
	try {
		updateUrl = await getUpdateImageUrl(blogId, userId);
		return formatJSONResponse({ url: updateUrl }, 200);
	} catch (ex) {
		return formatJSONResponse({}, 400);
	}
};

export const main = middyfy(handler);
