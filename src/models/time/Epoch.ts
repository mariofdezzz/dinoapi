import { Period } from './Period.ts';

export interface Epoch {
	name: string;
	start: number;
	startError: number;
	period: Period;
}
