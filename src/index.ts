import { serve } from 'http';
import { routeHandler } from '/router/index.ts';

serve(routeHandler, {
	onListen({ port }) {
		console.log(`Listening on http://localhost:${port}/graphql`);
	},
});
