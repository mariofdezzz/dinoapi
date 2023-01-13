import { DB } from '/db/index.ts';

const db = await DB.instance();

export const resolvers = {
	Query: {
		allDinos: async () => {
			return await db.getAllDino();
		},
	},
};
