import React from "react";
import './PostList.css';
import PostListItem from "./PostListItem";
import { Row, Col } from "reactstrap";
import {  useHistory } from "react-router-dom";
import { Post } from './Post';
import { POST_LIST_HEADING, ADD_POST_BUTTON_TEXT } from "../const/config";

interface Props {
    posts:Post[]
    edit:(id:string)=>void
    delete:(id:string)=>void
}
/**
 * @param data of type Post[]
 * @returns <PostListItem key={post.id}
        post={post}
        edit={props.edit}
        deletePost={props.delete}
      />
 */
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
/**
 * PostBoard displays {@linkcode PostListItem} PostListItem Component
 * Receives edit and delete  as props
 */
const PostList:React.FC<Props> = (props: Props) => {
  const history = useHistory();
  /**
 * Navigates to Add Post page.
 */
  const addPost = () => {
    history.push('/posts/new')
  }
  return (
    <div  data-testid='postlist-container' className='PostList'>
      <Row>
        <Col md="10">
          <h1 className="PostList__Heading">{POST_LIST_HEADING}</h1>
        </Col>
      </Row>
      <Row>
          <Col md="6">
            <button type='button' className='btn--primary' 
            title='Add new post'
            onClick={addPost}>
              {ADD_POST_BUTTON_TEXT}
                
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
