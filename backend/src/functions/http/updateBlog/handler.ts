import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { updateUserBlog } from '@businessLogic/blogs';
import { parseUserId } from '@auth/utils';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
	async event => {
		const blogId = event.pathParameters.blogId;

		const authorizationHeader = event.headers.Authorization;
		const jwtToken = authorizationHeader.split(' ')[1];

		const userId = parseUserId(jwtToken);
		try {
			const updatedBlog = await updateUserBlog(userId, blogId, event.body);
			return formatJSONResponse({ item: updatedBlog }, 200);
		} catch (ex) {
			return formatJSONResponse({}, 400);
		}
	};

export const main = middyfy(handler);
