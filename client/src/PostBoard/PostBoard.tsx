import React from "react";
import PostList from "../PostList/PostList";
import { useHistory } from "react-router-dom";
import { usePost } from "../hooks";
/**
 * PostBoard displays {@linkcode PostList} PostList Component
 */
const PostBoard = () => {
  const history = useHistory();
  const { posts, deletePost } = usePost();
  /**
 * Navigates to edit post page.
 * @param id of the post.
 */
  const editHandler = (id: string) => {
    history.push(`/posts/new/${id}?mode=edit`);
  };

  return (
    <div>
      <PostList
        data-testid="postlist-container"
        edit={editHandler}
        delete={deletePost}
        posts={posts}
      />
    </div>
  );
};

export default PostBoard;
