import { Epoch } from './time/Epoch.ts';
import { Specie } from './taxonomy/Specie.ts';

export interface Dino {
	name: string;
	temporalRange: Epoch;
	specie: Specie;
	// locations: Continent[];
	weight: number;
	length: number;
	height: number;
}
