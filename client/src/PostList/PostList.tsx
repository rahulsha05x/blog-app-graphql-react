import React from "react";
import './PostList.css';
import PostListItem from "./PostListItem";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Post } from './Post';

interface Props {
    posts:Post[]
    edit:(id:string)=>void
    delete:(id:string)=>void
}
const getPostList = (data: Post[], props: Props) => {
  if (!postMessage.length) {
    return null;
  }
  const list = data.map((post) => {
    return (
      <PostListItem
        key={post.id}
        post={post}
        edit={props.edit}
        deletePost={props.delete}
      />
    );
  });
  return list;
};
const PostList:React.FC<Props> = (props: Props) => {
  return (
    <div  data-testid='postlist-container' className='PostList'>
      <Row>
        <Col md="10">
          <h1 className="PostList__Heading">Posts</h1>
        </Col>
      </Row>
      <Row>
          <Col md="6">
            <button type='button' className='btn--primary' title='Add new post'>

                <Link to={'/posts/new'}>

                    Add Post
                </Link>
            </button>
          </Col>
      </Row>
      <Row>
        <Col className='PostList__Item'>{getPostList(props.posts, props)}</Col>
      </Row>
    </div>
  );
};
export default PostList;
