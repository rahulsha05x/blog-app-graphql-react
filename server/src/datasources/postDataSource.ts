  
import { RESTDataSource } from "apollo-datasource-rest";
import { Post } from "../interface/Post";

export class PostDataSource extends RESTDataSource {
  constructor() {
    super();
    // this.baseURL = "https://api.randomuser.me/";
    this.baseURL = "http://localhost:8080";
  }

  async getPosts() {
    const posts = await this.get("/posts");
    return posts;
  }
  async getPostById(id:string) {
      const post = await this.get(`/posts/${id}`)
      return post;
  }
  async addNewPost({title,description}:Post) {
      const post = await this.post(`/posts`,{title,description});
      return post
  }
  async deletePost(id:string) {
      const post = await this.delete(`/posts/${id}`);
      return {status:"Success"};
  }
  async updatePost({id,title,description}:Post) {
      console.log("id is",id)
      const post = await this.patch(`/posts/${id}`,{id,title,description});
      return post;
  }
}