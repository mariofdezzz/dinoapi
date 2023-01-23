import { DB } from '/db/index.ts';
import { DBController } from './types.ts';

export class CrudController<T> implements DBController<T> {
	constructor(private db: DB, private table: string) {}

	async find(id: number) {
		try {
			const queryResult = await this.db.queryDB<T>(`
        SELECT *
        FROM ${this.table}
        WHERE id = ${id}
      `);
			const data = queryResult.rows[0];

			return data;
		} catch (error) {
			return error;
		}
	}
	async findAll() {
		try {
			const queryResult = await this.db.queryDB<T>(`
        SELECT *
        FROM ${this.table}
      `);
			const data = queryResult.rows;

			return data;
		} catch (error) {
			return error;
		}
	}
}
