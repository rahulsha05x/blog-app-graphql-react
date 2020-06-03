import { Post } from "./interface/Post";
import { IResolvers } from "apollo-server";
interface inputVars {
  id:string
}
/**
 * Query to show Posts and Post
 * Post @param id
 */
const Query = {
  post: (_root: void, { id }: inputVars, { dataSources }: any): Post => {
    try {
      const post = dataSources.postsDataAPI.getPostById(id);
      return post;
    } 
    catch(error) {
      console.log('Post with ID error',error)
      return error
    }

  },
  posts: (_root: void, _args: void, { dataSources }: any): Post[] => {
    try {
      return dataSources.postsDataAPI.getPosts();
    } catch(error) {
      console.log('Get Post error',error);
      return error
    }
    
  },
};
const Mutation = {
  createPost: async (_root: void, { input }: any, { dataSources }: any) => {
    try {
      return dataSources.postsDataAPI.addNewPost(input);
    } catch (e) {
      throw new Error(e);
    }
  },
  updatePost: async (
    _root: any,
    { id, title, description }: Post,
    { dataSources }: any
  ) => {
    try {
      return dataSources.postsDataAPI.updatePost({ id, title, description });
    } catch (e) {
      throw new Error(e);
    }
  },
  deletePost: async (_root: any, { id }: inputVars, { dataSources }: any) => {
    try {
      const res = await dataSources.postsDataAPI.deletePost(id);
      return res;
    } catch (e) {
      throw new Error(e);
    }
  },
};

export const resolvers:IResolvers = {
  Query,
  Mutation,
};
