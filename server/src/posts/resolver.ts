import { Post } from '../interface/Post';
import { IResolvers, UserInputError } from 'apollo-server';
interface inputVars {
  id: string;
}
interface PostResponse {
  success: boolean;
  code: string;
  response?: any;
  error?: any;
}

/**
 * Query to show Posts and Post
 * Post @param id
 */
export const resolvers = {
  post: (_root: void, { id }: { id: string }, { dataSources }: any): Post => {
    try {
      const post = dataSources.postsDataAPI.getPostById(id);
      return post;
      //return { success: true, response: post, code: '200' };
    } catch (error) {
      console.log('Post with ID error', error);
      return error;
      //return { success: false, error: error, code: '201' };
    }
  },
  posts: (_root: void, _args: void, { dataSources }: any): Post[] => {
    try {
      return dataSources.postsDataAPI.getPosts();
    } catch (error) {
      console.log('Get Post error', error);
      return error;
    }
  },
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
      const response = dataSources.postsDataAPI.updatePost({
        id,
        title,
        description,
      });
      return response;
    } catch (e) {
      return new Error(e);
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
