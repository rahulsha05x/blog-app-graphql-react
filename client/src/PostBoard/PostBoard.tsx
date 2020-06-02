import React from "react";
import PostList from "../PostList/PostList";
import { useHistory } from "react-router-dom";
import { usePost } from "../hooks";
import { useQuery } from "@apollo/react-hooks";
import { LOAD_POSTS } from "../Queries";

const PostBoard = () => {
  const history = useHistory();
  const { posts, deletePost } = usePost();
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
