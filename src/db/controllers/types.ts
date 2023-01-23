export interface DBController<T> {
	find(id: number): Promise<T>;
	findAll(params?: FilterParams<T>): Promise<T[]>;
}

export type FilterParams<T> = SortParams<T> & PaginationParams;

export type SortParams<T> = {
	sortBy?: keyof T;
	sortOrder?: keyof typeof SortOrder;
};

export type PaginationParams = {
	limit?: number;
	offset?: number;
};

export const SortOrder = {
	ASC: 'ASC',
	DESC: 'DESC',
} as const;
