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
  input:Input
}
interface PostVar {
  id:string | undefined;
}
interface Status {
  status:string
}
interface Posts {
  posts:PostData[]
}
interface Post {
  post:PostData
}
export const usePost = (id?:string) => {
  const history = useHistory();
  let { data, refetch } = useQuery<Posts,PostVar>(LOAD_POSTS);
  const {data:data_post} = useQuery<Post,PostVar>(GET_POST,{
    variables:{id},
    onError:(error) => console.log(error)
  });
  const [deletePost] = useMutation<Status,PostVar>(DELETE_POSTS, {
    onCompleted: (record) => {
      refetch();
    },
  });
  const [createPost] = useMutation<PostData>(ADD_POST, {
    onCompleted: () => {
      history.push("/");
    },
  });
  const [updatePost] = useMutation<PostData>(UPDATE_POST, {
    onCompleted: () => {
      history.push("/");
    },
  });

  const posts = data ? data.posts : [];
  const post = data_post ? data_post.post : new PostData(id="","","")
  useEffect(() => {
    refetch();
  }, [refetch]);
  return {
    posts,
    post,
    deletePost: (id: string) => deletePost({ variables: { id } }),
    createPost: (input: Input) => createPost({ variables: { input } }),
    updatePost: (id: string, title: string, description: string) =>
      updatePost({ variables: { id, title, description } }),
  };
};
