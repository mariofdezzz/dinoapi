import { Epoch } from './time/Epoch.ts';
import { Specie } from './taxonomy/Specie.ts';

export interface Dino {
	name: string;
	epoch: Epoch;
	specie: Specie;
	// locations: Continent[];
	weight: number;
	length: number;
	height: number;
}
