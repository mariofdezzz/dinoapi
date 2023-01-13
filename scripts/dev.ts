import { config } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts';

const env = config({ path: './.env.local' });

for (const [k, v] of Object.entries(env)) {
	Deno.env.set(k, v);
}

import('../src/index.ts');
