import { GraphQLHTTP } from '/wrappers/graphqlHttp.ts';
import { RouteHandler } from 'toruk';
import { schema } from '/graphql/index.ts';

export const handler: RouteHandler = async ({ req }) => {
	return await GraphQLHTTP<Request>({
		schema,
		graphiql: true,
	})(req);
};
