import { ApolloServer, gql, IResolverObject } from "apollo-server";
import { PostDataSource } from "./src/datasources/postDataSource";
import { resolvers } from "./src/resolver";
import { importSchema } from "graphql-import";
import { DocumentNode } from "graphql";

const typeDefs:string = importSchema("./src/schema/schema.graphql");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    postsDataAPI: new PostDataSource(),
  }),
});

// The `listen` method launches a web server.
server.listen({ port: 8000 }).then(({ url }) => {
  console.log(` Server ready at ${url}`);
});
