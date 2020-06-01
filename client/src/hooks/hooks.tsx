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
import { Post } from "../PostList/Post";

interface Input {
  title: string;
  description: string;
}
export const usePost = (id?:string) => {
  const history = useHistory();
  let { data, refetch } = useQuery(LOAD_POSTS);
  const {data:data_post} = useQuery(GET_POST,{
    variables:{id},
    onError:(error) => console.log(error)
  });
  const [deletePost] = useMutation(DELETE_POSTS, {
    onCompleted: (record) => {
      refetch();
    },
  });
  const [createPost] = useMutation(ADD_POST, {
    onCompleted: () => {
      history.push("/");
    },
  });
  const [updatePost] = useMutation(UPDATE_POST, {
    onCompleted: () => {
      history.push("/");
    },
  });

  const posts = data ? data.posts : [];
  const post = data_post ? data_post.post : new Post(id="","","")
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
