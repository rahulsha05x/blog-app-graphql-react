import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  DELETE_POSTS,
  LOAD_POSTS,
  ADD_POST,
  UPDATE_POST,
  GET_POST,
} from "../Queries";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Post as PostData } from "../PostList/Post";

interface Input {
  title: string;
  description: string;
}
interface InputData {
  input: Input;
}
interface PostVar {
  id: string | undefined;
}
interface Status {
  status: string;
}
interface Posts {
  posts: PostData[];
}
interface Post {
  post: PostData;
}
/**
 * This contains use post hook
 * @returns posts
 * @returns deletePost
 * @returns createPost
 * @returns updatePost
 */
export const usePost = () => {
  const history = useHistory();
  let { data, refetch } = useQuery<Posts, PostVar>(LOAD_POSTS, {
    onCompleted:()=>console.log("Get posts hook called"),
    onError: (error) => console.log("Get posts",error),
  });
  const [deletePost] = useMutation<Status, PostVar>(DELETE_POSTS, {
    onCompleted: (record) => {
      refetch();
    },
    onError: (error) => console.log(error),
  });
  const [createPost] = useMutation<PostData>(ADD_POST, {
    onCompleted: () => {
      history.push("/");
    },
    onError: (error) => console.log(error),
  });
  const [updatePost] = useMutation<PostData>(UPDATE_POST, {
    onCompleted: () => {
      history.push("/");
    },
  });

  const posts = data ? data.posts : [];
  
  useEffect(() => {
    refetch();
  }, [refetch]);
  return {
    posts,
    deletePost: (id: string) => deletePost({ variables: { id } }),
    createPost: (input: Input) => createPost({ variables: { input } }),
    updatePost: (id: string, title: string, description: string) =>
      updatePost({ variables: { id, title, description } }),
  };
};
/**
 * This contains use post by id hook
 * @param id of type string
 * @returns post
 */
export const usePostById = (id:string) => {
  const { data: data_post } = useQuery<Post, PostVar>(GET_POST, {
    variables: { id },
    onCompleted:()=>console.log("Get post hook called",id),
    onError: (error) => console.log("Get post error",error),
  });
  const post = data_post ? data_post.post : new PostData((id = ""), "", "");
  return {
    post
  }
}