import React from "react";
import PostList from "../PostList/PostList";
import { useHistory } from "react-router-dom";
import { usePost } from "../hooks";
import Spinner from "../util/Spinner/Spinner";
import { Alert } from "reactstrap";

/**
 * PostBoard displays {@linkcode PostList} PostList Component
 */
const PostBoard = () => {
  const history = useHistory();
  const { posts, deletePost, posts_error,loading,delete_error } = usePost();
  /**
   * Navigates to edit post page.
   * @param id of the post.
   */
  const editHandler = (id: string) => {
    history.push(`/posts/new/${id}?mode=edit`);
  };
  if(loading) {
    return <Spinner />
  }
  if (posts_error) {
    return (
      <div>
        <PostList
          data-testid="postlist-container"
          edit={editHandler}
          delete={deletePost}
          posts={posts}
          error={posts_error}
        />
      </div>
    )
  }
  return (
    <div>
      {!posts_error && (
        <PostList
          data-testid="postlist-container"
          edit={editHandler}
          delete={deletePost}
          posts={posts}
        />
      )}
    </div>
  );
};

export default PostBoard;
