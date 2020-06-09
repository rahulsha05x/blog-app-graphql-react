import React, { useState } from 'react';
import './PostDetail.css';
import { Row, Col, Alert } from 'reactstrap';
import { usePostById } from '../hooks';
import Spinner from '../util/Spinner/Spinner';
import { GET_POST, LOAD_POSTS } from '../Queries';
import { client } from '../App';
import { Post } from '../PostList/Post';
interface Props {
  match: any;
}
/**
 * Post Detail displays single Component
 * Props contains postId extracted from react router params.
 */
const PostDetail: React.FC<Props> = (props: Props) => {
  const { postId } = props.match.params;
  const { post, error, loading } = usePostById(postId);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return (
      <Alert color="danger" className="App_Alert">
        {error.message}
      </Alert>
    );
  }
  return (
    <section className="PostDetail">
      <Row>
        <Col>
          <h2 className="PostDetail__Title" data-testid="PostDetail__Title">
            {post.title}
          </h2>
          <p
            className="PostDetail__Description"
            data-testid="PostDetail__Description"
          >
            {post.description}
          </p>
        </Col>
      </Row>
    </section>
  );
};

export default PostDetail;
