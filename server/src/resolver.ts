import { Post } from "./interface/Post";

const Query = {
  post: (_root: any, { id }: any, { dataSources }: any): Post => {
    const post = dataSources.postsDataAPI.getPostById(id);
    if (!post) {
      throw new Error("Could not find post with id");
    }
    return post;
  },
  posts: (_root: any, _args: any, { dataSources }: any): Post[] => {
    return dataSources.postsDataAPI.getPosts();
  },
};
const Mutation = {
  createPost: async (_root: any, { input }: any, { dataSources }: any) => {
    try {
      return dataSources.postsDataAPI.addNewPost(input);
    } catch (e) {
      throw new Error(e);
    }
  },
  updatePost: async (
    _root: any,
    { id, title, description }: any,
    { dataSources }: any
  ) => {
    try {
      return dataSources.postsDataAPI.updatePost({ id, title, description });
    } catch (e) {
      throw new Error(e);
    }
  },
  deletePost: async (_root: any, { id }: any, { dataSources }: any) => {
    try {
      const res = await dataSources.postsDataAPI.deletePost(id);
      return res;
    } catch (e) {
      throw new Error(e);
    }
  },
};

export const resolvers = {
  Query,
  Mutation,
};
