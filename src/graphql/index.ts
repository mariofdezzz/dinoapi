import { gql } from 'graphql_tag';
import { makeExecutableSchema } from 'graphql_tools';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
	Query: {
		hello: () => `Hello, World!`,
	},
};

export const schema = makeExecutableSchema({ resolvers, typeDefs });
