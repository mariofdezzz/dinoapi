import { DB } from '/db/index.ts';
import { DBController, FilterParams, SortOrder } from './types.ts';

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
	async findAll(
		{ sortBy, sortOrder = SortOrder.ASC, limit, offset }: FilterParams<T> = {},
	) {
		try {
			const queryResult = await this.db.queryDB<T>(`
        SELECT *
        FROM ${this.table}
				${sortBy ? `ORDER BY ${String(sortBy)} ${sortOrder}` : ''}
				${limit ? `LIMIT ${limit}` : ''}
				${offset ? `OFFSET ${offset}` : ''}
      `);
			const data = queryResult.rows;

			return data;
		} catch (error) {
			return error;
		}
	}
}
