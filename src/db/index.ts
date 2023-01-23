import { Dino } from '@/Dino.ts';
import { Family } from '@/taxonomy/Family.ts';
import { Kingdom } from '@/taxonomy/Kingdom.ts';
import { Specie } from '@/taxonomy/Specie.ts';
import { Epoch } from '@/time/Epoch.ts';
import { Era } from '@/time/Era.ts';
import { Period } from '@/time/Period.ts';
import { Pool } from 'postgres';
import type { QueryObjectResult } from 'postgres/query/query.ts';
import { CrudController } from './controllers/CrudController.ts';
import {
	DBDino,
	DBEpoch,
	DBEra,
	DBFamily,
	DBKingdom,
	DBPeriod,
	DBSpecie,
} from './models/types.ts';

export class DB {
	private pool: Pool;

	// Controllers
	public dinos: CrudController<DBDino>;

	public family: CrudController<DBFamily>;
	public kingdom: CrudController<DBKingdom>;
	public specie: CrudController<DBSpecie>;

	public eras: CrudController<DBEra>;
	public epochs: CrudController<DBEpoch>;
	public periods: CrudController<DBPeriod>;

	constructor() {
		this.pool = new Pool(
			{
				user: Deno.env.get('DB_USER'),
				password: Deno.env.get('DB_PASS'),
				database: Deno.env.get('DB_NAME'),
				hostname: Deno.env.get('DB_HOST'),
				port: Number(Deno.env.get('DB_PORT')),
				tls: {
					caCertificates: [
						Deno.env.get('DB_CERT')?.replace(/\\n/g, '\n') ?? '',
					],
				},
			},
			20,
			true,
		);

		this.dinos = new CrudController(this, 'dino');

		this.family = new CrudController(this, 'family');
		this.kingdom = new CrudController(this, 'kingdom');
		this.specie = new CrudController(this, 'specie');

		this.eras = new CrudController(this, 'era');
		this.epochs = new CrudController(this, 'epoch');
		this.periods = new CrudController(this, 'period');
	}

	public async queryDB<T>(
		query: string,
	): Promise<QueryObjectResult<T>> {
		const conn = await this.pool.connect();

		const result = await conn.queryObject<T>(query);

		conn.release();
		return result;
	}

	async getAllDino(): Promise<Dino[] | Error> {
		try {
			const dinoResult = await this.queryDB<DBDino>(`
				SELECT *
				FROM dino
      `);
			const dinos = dinoResult.rows;

			return await Promise.all(
				dinos.map<Promise<Dino>>(async (dino) => ({
					...dino,
					specie: await this.getSpecie(dino.specie),
					temporalRange: await this.getTemporalRange(dino.temporalRange),
				})),
			);
		} catch (error) {
			return error;
		}
	}

	async getSpecie(id: number): Promise<Specie> {
		try {
			const specieResult = await this.queryDB<DBSpecie>(`
				SELECT *
				FROM specie
				WHERE id = ${id}
			`);
			const specie = specieResult.rows[0];

			return {
				...specie,
				family: await this.getFamily(specie.family),
			};
		} catch (error) {
			return error;
		}
	}

	async getFamily(id: number): Promise<Family> {
		try {
			const familyResult = await this.queryDB<DBFamily>(`
				SELECT *
				FROM family
				WHERE id = ${id}
			`);
			const family = familyResult.rows[0];

			return {
				...family,
				kingdom: await this.getKingdom(family.kingdom),
			};
		} catch (error) {
			return error;
		}
	}

	async getKingdom(id: number): Promise<Kingdom> {
		try {
			const kingdomResult = await this.queryDB<DBKingdom>(`
				SELECT *
				FROM kingdom
				WHERE id = ${id}
			`);
			const kingdom = kingdomResult.rows[0];

			return kingdom;
		} catch (error) {
			return error;
		}
	}

	async getTemporalRange(id: number): Promise<Epoch> {
		try {
			const epochResult = await this.queryDB<DBEpoch>(`
				SELECT *
				FROM epoch
				WHERE id = ${id}
			`);
			const epoch = epochResult.rows[0];

			return {
				...epoch,
				period: await this.getPeriod(epoch.period),
			};
		} catch (error) {
			return error;
		}
	}

	async getEpochs(): Promise<DBEpoch[]> {
		try {
			const epochResult = await this.queryDB<DBEpoch>(`
				SELECT *
				FROM epoch
			`);
			const epochs = epochResult.rows;

			return epochs;
		} catch (error) {
			return error;
		}
	}

	async getPeriod(id: number): Promise<Period> {
		try {
			const periodResult = await this.queryDB<DBPeriod>(`
				SELECT *
				FROM period
				WHERE id = ${id}
			`);
			const period = periodResult.rows[0];

			return {
				...period,
				era: await this.getEra(period.era),
			};
		} catch (error) {
			return error;
		}
	}
	async getPeriods(): Promise<DBPeriod[]> {
		try {
			const periodResult = await this.queryDB<DBPeriod>(`
				SELECT *
				FROM period
			`);
			const period = periodResult.rows;

			return period;
		} catch (error) {
			return error;
		}
	}
	async getPeriod_(id: number): Promise<DBPeriod> {
		try {
			const periodResult = await this.queryDB<DBPeriod>(`
				SELECT *
				FROM period
				WHERE id = ${id}
			`);
			const period = periodResult.rows[0];

			return period;
		} catch (error) {
			return error;
		}
	}

	async getEra(id: number): Promise<Era> {
		try {
			const eraResult = await this.queryDB<DBEra>(`
				SELECT *
				FROM era
				WHERE id = ${id}
			`);
			const era = eraResult.rows[0];

			return era;
		} catch (error) {
			return error;
		}
	}
}
