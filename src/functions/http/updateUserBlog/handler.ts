import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { updateUserBlog } from '@businessLogic/blogs';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
	async event => {
		const blogId = event.pathParameters.blogId;

		const userId = '1234';
		try {
			const updatedBlog = await updateUserBlog(userId, blogId, event.body);
			return formatJSONResponse({ item: updatedBlog }, 200);
		} catch (ex) {
			return formatJSONResponse({}, 400);
		}
	};

export const main = middyfy(handler);
