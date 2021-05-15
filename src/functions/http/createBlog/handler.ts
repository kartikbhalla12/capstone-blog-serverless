import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { createBlog } from '@businessLogic/blogs';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
	async event => {
		const userId = '124';
		const blog = await createBlog(event.body, userId);

		return formatJSONResponse(
			{
				item: blog,
			},
			201
		);
	};

export const main = middyfy(handler);
