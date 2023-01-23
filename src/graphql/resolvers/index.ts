import {
	DBDino,
	DBEpoch,
	DBFamily,
	DBPeriod,
	DBSpecie,
} from '/db/models/types.ts';
import { DB } from '/db/index.ts';
import { FilterParams, SortOrder } from '../../db/controllers/types.ts';

const db = new DB();

export const resolvers = {
	Query: {
		async dinos() {
			return await db.dinos.findAll();
		},
		async periods() {
			return await db.periods.findAll();
		},
		async period(_: unknown, { id }: { id: number }) {
			return await db.periods.find(id);
		},
		async era(_: unknown, { id }: { id: number }) {
			return await db.eras.find(id);
		},
		async epochs(_: unknown, params: FilterParams<DBEpoch>) {
			// TODO: Validate sort params

			return await db.epochs.findAll(params);
		},
	},
	Dino: {
		async epoch(dino: DBDino) {
			return await db.epochs.find(dino.temporalRange);
		},
		async specie(dino: DBDino) {
			return await db.specie.find(dino.specie);
		},
	},
	Specie: {
		async family(specie: DBSpecie) {
			return await db.family.find(specie.family);
		},
	},
	Family: {
		async kingdom(family: DBFamily) {
			return await db.kingdom.find(family.kingdom);
		},
	},
	Epoch: {
		async period(epoch: DBEpoch) {
			return await db.periods.find(epoch.period);
		},
		async fullName(epoch: DBEpoch) {
			const period = await db.periods.find(epoch.period);

			return `${period.name} ${epoch.name}`;
		},
	},
	Period: {
		async era(period: DBPeriod) {
			return await db.eras.find(period.era);
		},
	},
};
