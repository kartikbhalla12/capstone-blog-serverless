import { JwtPayload } from './../../auth/JwtPayload';
import { middyfy } from '@libs/lambda';
import {
	APIGatewayAuthorizerHandler,
	APIGatewayAuthorizerResult,
	APIGatewayTokenAuthorizerEvent,
} from 'aws-lambda';
import * as jwt from 'jsonwebtoken';
import { createLogger } from '@utils/logger';
import * as jwksClient from 'jwks-rsa';
import { Jwt } from '@auth/Jwt';

const logger = createLogger('auth');
const jwksUrl = 'https://dev-gg9z0y7i.us.auth0.com/.well-known/jwks.json';

const handler: APIGatewayAuthorizerHandler = async (
	event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
	try {
		const decodedToken = await verifyToken(event.authorizationToken);
		logger.info('User was authorized', decodedToken);

		return {
			principalId: decodedToken.sub,
			policyDocument: {
				Version: '2012-10-17',
				Statement: [
					{ Action: 'execute-api:Invoke', Effect: 'Allow', Resource: '*' },
				],
			},
		};
	} catch (ex) {
		logger.error('User not authorized', { error: ex.message });

		return {
			principalId: 'user',
			policyDocument: {
				Version: '2012-10-17',
				Statement: [
					{ Action: 'execute-api:Invoke', Effect: 'Deny', Resource: '*' },
				],
			},
		};
	}
};

const verifyToken = async (authHeader: string): Promise<JwtPayload> => {
	const token = getToken(authHeader);
	const jwtDecoded: Jwt = (await jwt.decode(token, { complete: true })) as Jwt;

	const client = jwksClient({
		jwksUri: jwksUrl,
	});

	const key = await client.getSigningKey(jwtDecoded.header.kid);
	const signingKey = key.getPublicKey();

	return jwt.verify(token, signingKey, { algorithms: ['RS256'] }) as JwtPayload;
};

const getToken = (authHeader: string) => {
	if (!authHeader) throw new Error('No Authorization header!');
	if (!authHeader.toLowerCase().startsWith('bearer '))
		throw new Error('Invalid Authorization header!');

	return authHeader.split(' ')[1];
};

export const main = middyfy(handler);
