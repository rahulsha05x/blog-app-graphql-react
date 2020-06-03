import { Arg, FieldResolver, Query, Resolver, Root, Ctx,ID } from "type-graphql";
import Posts from "../schema/Posts";
import { Post } from "../schema/Post";
import { PostDataSource } from "../datasources/postDataSource";
interface PostData {
    id:string,
    title:string
}
@Resolver(of => Posts)
export default class PostResolver {
    constructor(private postDataApi: PostDataSource) {}
  @Query(returns => Post, { nullable: true })
  postById(@Arg("id") id: string): PostData | undefined | Promise<PostData> {
    const post = this.postDataApi.getPostById(id);
    if (!post) {
      throw new Error("Could not find post with id");
    }
    return post;
  }
  @Query(returns => Post, { nullable: true })
  getPost(): PostData[] | undefined | Promise<PostData[]> {
    const posts = this.postDataApi.getPosts();
    if (!posts) {
      throw new Error("Could not find post with id");
    }
    return posts;
  }
}