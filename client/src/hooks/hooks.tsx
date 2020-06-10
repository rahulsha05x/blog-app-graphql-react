import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  DELETE_POSTS,
  LOAD_POSTS,
  ADD_POST,
  UPDATE_POST,
  GET_POST,
} from '../Queries';
import { useHistory } from 'react-router-dom';
import { Post as PostData } from '../Post/PostList/Post';

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
  let { data, error: posts_error, loading } = useQuery<Posts, PostVar>(
    LOAD_POSTS,
    {
      onCompleted: () => console.log('Get posts hook called'),
      onError: (error) => console.log('Get posts', error),
    }
  );
  const [
    deletePost,
    { loading: delete_loading, error: delete_error },
  ] = useMutation<Status, PostVar>(DELETE_POSTS, {
    refetchQueries: [{ query: LOAD_POSTS }],

    onError: (error) => console.log(error),
  });
  const [updatePost] = useMutation<PostData>(UPDATE_POST, {
    onCompleted: () => {
      history.push('/');
    },
  });

  const posts = data ? data.posts : [];

  return {
    posts,
    posts_error,
    loading,
    delete_loading,
    delete_error,
    deletePost: (id: string) => deletePost({ variables: { id } }),

    updatePost: (id: string, title: string, description: string) =>
      updatePost({ variables: { id, title, description } }),
  };
};
/**
 * This contains use post by id hook
 * @param id of type string
 * @returns post
 */
export const usePostById = (id: string) => {
  const { data: data_post, error, loading } = useQuery<Post, PostVar>(
    GET_POST,
    {
      variables: { id },
      onCompleted: () => console.log('Get post hook called', id),
      onError: (error) => console.log('Get post error', error),
    }
  );
  const post = data_post ? data_post.post : new PostData((id = ''), '', '');
  return {
    post,
    error,
    loading,
  };
};

export const useAddPost = () => {
  const history = useHistory();
  const [
    createPost,
    { loading: create_loading, error: create_error, data: create_data },
  ] = useMutation<PostData>(ADD_POST, {
    update: (store, { data: cacheData }) => {
      const data: any = store.readQuery({
        query: LOAD_POSTS,
      });
      if (data && data.posts && cacheData) {
        data?.posts.push(cacheData);
      }
      store.writeQuery({ query: LOAD_POSTS, data });
      history.push('/');
    },

    //refetchQueries: [{ query: LOAD_POSTS }],
    onError: (error) => console.log(error),
  });
  return {
    create_data,
    create_loading,
    create_error,
    createPost: (input: Input) => createPost({ variables: { input } }),
  };
};
