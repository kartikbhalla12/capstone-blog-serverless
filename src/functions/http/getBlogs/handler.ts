import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { getBlogs } from '@businessLogic/blogs';

const handler: APIGatewayProxyHandler = async () => {
	const userId = '1234';

	const blogs = await getBlogs(userId);
	return formatJSONResponse({ items: blogs }, 200);
};

export const main = middyfy(handler);
