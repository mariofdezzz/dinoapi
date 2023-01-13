import { gql } from 'graphql_tag';
import { getLiterals } from './getLiterals.ts';

export const typeDefs = gql(
	await getLiterals(),
);
