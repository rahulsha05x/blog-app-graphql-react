import { ApolloServer, gql, IResolverObject } from "apollo-server";
import { PostDataSource } from "./src/datasources/postDataSource";
import { resolvers } from "./src/resolver";
import { importSchema } from "graphql-import";
import { DocumentNode } from "graphql";

const typeDefs:string = importSchema("./src/schema/schema.graphql");

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    // Don't give the specific errors to the client.
    if (err.message.startsWith("Database Error: ")) {
      return new Error('Internal server error');
    }
    
    // Otherwise return the original error.  The error can also
    // be manipulated in other ways, so long as it's returned.
    return err;
  },
  dataSources: () => ({
    postsDataAPI: new PostDataSource(),
  }),
});

// The `listen` method launches a web server.
server.listen({ port: 8000 }).then(({ url }) => {
  console.log(` Server ready at ${url}`);
});
