import { Dino } from '@/Dino.ts';
import { Specie } from '@/taxonomy/Specie.ts';
import { Family } from '@/taxonomy/Family.ts';
import { Kingdom } from '@/taxonomy/Kingdom.ts';
import { Epoch } from '@/time/Epoch.ts';
import { Period } from '@/time/Period.ts';

export type DBDino = Omit<Omit<Dino, 'specie'>, 'epoch'> & {
	id: number;
	specie: number;
	epoch: number;
};

export type DBSpecie = Omit<Specie, 'family'> & {
	id: number;
	family: number;
};

export type DBFamily = Omit<Family, 'kingdom'> & {
	id: number;
	kingdom: number;
};

export type DBKingdom = Kingdom & {
	id: number;
};

export type DBEpoch = Omit<Epoch, 'period'> & {
	id: number;
	period: number;
};

export type DBPeriod = Omit<Period, 'era'> & {
	id: number;
	era: number;
};

export type DBEra = Period & {
	id: number;
};
