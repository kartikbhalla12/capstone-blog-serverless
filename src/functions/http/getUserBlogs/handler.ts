import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { getUserBlogs } from '@businessLogic/blogs';

const handler: APIGatewayProxyHandler = async () => {
	const userId = '1234';

	const blogs = await getUserBlogs(userId);
	return formatJSONResponse({ items: blogs }, 200);
};

export const main = middyfy(handler);
