import { serve } from 'http';
import { router } from '/router/index.ts';

serve(router, {
	onListen({ port }) {
		console.log(`Listening on http://localhost:${port}/graphql`);
	},
});
