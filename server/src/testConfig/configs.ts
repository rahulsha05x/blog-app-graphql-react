import { PostDataSource } from "../datasources/postDataSource";
import { ApolloServer } from "apollo-server";
import { importSchema } from "graphql-import";
import { resolvers } from "../resolver";
import ApolloServerBase,{createTestClient,ApolloServerTestClient} from 'apollo-server-testing';
import {typeDefs} from './schema'



export const constructTestServer = (dataSources:any):ApolloServerTestClient => {
    const postsDataAPI = new PostDataSource();
  
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      dataSources,
    });
  
    return createTestClient(server);
  };