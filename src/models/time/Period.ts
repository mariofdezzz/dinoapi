import { Era } from './Era.ts';

export interface Period {
	name: string;
	start: number;
	startError: number;
	era: Era;
}
