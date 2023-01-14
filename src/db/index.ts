import { Dino } from '@/Dino.ts';
import { Family } from '@/taxonomy/Family.ts';
import { Kingdom } from '@/taxonomy/Kingdom.ts';
import { Specie } from '@/taxonomy/Specie.ts';
import { Epoch } from '@/time/Epoch.ts';
import { Era } from '@/time/Era.ts';
import { Period } from '@/time/Period.ts';
import type { PoolClient } from 'postgres';
import { Pool } from 'postgres';
import {
	DBDino,
	DBEpoch,
	DBEra,
	DBFamily,
	DBKingdom,
	DBPeriod,
	DBSpecie,
} from './types.ts';

export class DB {
	private constructor(private connection: PoolClient) {}

	static async instance(): Promise<DB> {
		const pool = new Pool(
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
			3,
			true,
		);

		const connection = await pool.connect();

		return new DB(connection);
	}

	async getAllDino(): Promise<Dino[] | Error> {
		try {
			const dinoResult = await this.connection.queryObject<DBDino>(`
				SELECT *
				FROM dino
      `);
			const dinos = dinoResult.rows;
			const result: Dino[] = [];

			for await (const dino of dinos) {
				result.push({
					...dino,
					specie: await this.getSpecie(dino.specie),
					temporalRange: await this.getTemporalRange(dino.temporalRange),
				});
			}

			return result;
			// FIXME: Solve asyncrhonous problem
			// return await Promise.all(
			// 	dinos.map<Promise<Dino>>(async (dino) => ({
			// 		...dino,
			// 		specie: await this.getSpecie(dino.specie),
			// 		temporalRange: await this.getTemporalRange(dino.temporalRange),
			// 	})),
			// );
		} catch (error) {
			return error;
		}
	}

	private async getSpecie(id: number): Promise<Specie> {
		try {
			const specieResult = await this.connection.queryObject<DBSpecie>(`
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

	private async getFamily(id: number): Promise<Family> {
		try {
			const familyResult = await this.connection.queryObject<DBFamily>(`
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

	private async getKingdom(id: number): Promise<Kingdom> {
		try {
			const kingdomResult = await this.connection.queryObject<DBKingdom>(`
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

	private async getTemporalRange(id: number): Promise<Epoch> {
		try {
			const epochResult = await this.connection.queryObject<DBEpoch>(`
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

	private async getPeriod(id: number): Promise<Period> {
		try {
			const periodResult = await this.connection.queryObject<DBPeriod>(`
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

	private async getEra(id: number): Promise<Era> {
		try {
			const eraResult = await this.connection.queryObject<DBEra>(`
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
