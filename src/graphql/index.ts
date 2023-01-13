import { makeExecutableSchema } from 'graphql_tools';
import { resolvers } from './resolvers/index.ts';
import { typeDefs } from './typedefs/index.ts';

export const schema = makeExecutableSchema({ resolvers, typeDefs });
