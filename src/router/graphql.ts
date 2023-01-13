import { RouteHandler } from 'toruk';

export const handler: RouteHandler = () => {
	return new Response('Hello, World!');
};
