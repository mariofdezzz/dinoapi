import { DB } from '/db/index.ts';

const db = new DB();

export const resolvers = {
	Query: {
		allDinos: async () => {
			return await db.getAllDino();
		},
	},
};
