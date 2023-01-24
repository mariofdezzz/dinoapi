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
}
