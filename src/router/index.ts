import { Router } from 'toruk';
import { handler } from './graphql.ts';

const router = new Router({
	routes: [
		{
			path: '/graphql',
			handler,
		},
	],
});

export const routeHandler = router.toHandler();
