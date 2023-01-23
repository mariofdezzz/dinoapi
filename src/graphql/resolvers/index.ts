import { FilterParams } from '../../db/controllers/types.ts';
import { DB } from '/db/index.ts';
import {
	DBDino,
	DBEpoch,
	DBEra,
	DBFamily,
	DBKingdom,
	DBPeriod,
	DBSpecie,
} from '/db/models/types.ts';

const db = new DB();

export const resolvers = {
	Query: {
		async dino(_: unknown, { id }: { id: number }) {
			// TODO: Find by name (flexible property)
			return await db.periods.find(id);
		},
		async dinos(_: unknown, params: FilterParams<DBDino>) {
			// FIXME: Validate sort params
			return await db.dinos.findAll(params);
		},

		// Taxonomy
		async species(_: unknown, params: FilterParams<DBSpecie>) {
			return await db.specie.findAll(params);
		},
		async families(_: unknown, params: FilterParams<DBFamily>) {
			return await db.family.findAll(params);
		},
		async kingdoms(_: unknown, params: FilterParams<DBKingdom>) {
			return await db.kingdom.findAll(params);
		},

		// Time
		async periods(_: unknown, params: FilterParams<DBPeriod>) {
			return await db.periods.findAll(params);
		},
		async epochs(_: unknown, params: FilterParams<DBEpoch>) {
			return await db.epochs.findAll(params);
		},
		async eras(_: unknown, params: FilterParams<DBEra>) {
			return await db.eras.findAll(params);
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

			return `${epoch.name} ${period.name}`;
		},
	},
	Period: {
		async era(period: DBPeriod) {
			return await db.eras.find(period.era);
		},
	},
};
