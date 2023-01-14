import { config } from 'dotenv';

const env = config({ path: './.env.local' });

for (const [k, v] of Object.entries(env)) {
	Deno.env.set(k, v);
}

import('../src/index.ts');
