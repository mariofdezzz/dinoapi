import { httpRouter } from 'toruk';
import { handler } from './graphql.ts';

export const router = httpRouter({
	routes: [
		{
			path: '/graphql',
			handler,
		},
		{
			method: 'POST',
			path: '/graphql',
			handler,
		},
	],
});
