export interface DBController<T> {
	find(id: number): Promise<T>;
	findAll(): Promise<T[]>;
}
