import React from "react";
import './PostListItem.css';
import {  useHistory } from "react-router-dom"
import { Post } from "./Post";
interface Props {
    key:string,
    post:Post,
    edit: (id:string) => void,
    deletePost: (id:string) => void,
}
/**
 * Receives posts array, deletePost and edit.
 * displays title and description for single post
 * contains buttons to edit and delete post
 */
const PostListItem:React.FC<Props> = ({post,deletePost,edit}: Props) => {
  const { id, title, description } = post;
  const history = useHistory()
  const trimDescription = description.length > 100? `${description.substring(0,150)}...`:description;
  /**
 * Navigates to posts/:id to display post
 */
  const openPost = (id:any) => {
    history.push(`/posts/${id}`)
  }
  return (
    <article className='PostItem' data-testid='PostList-Item'>
        <section className='PostItem__Card'>
            <h2 className='PostItem__Card--Heading' title={title}>
                <button type='button' data-testid='postitem-heading' className='PostItem__Card--heading' onClick={()=>openPost(id)}>{title}</button>
            </h2>
            <p className='PostItem__Card--Description'>
                {trimDescription}
            </p>
            <article className='PostItem__Card__Button'>
                <button type='button' 
                    className='PostItem__Card__Button--edit btn--primary'
                    onClick={()=>edit(id)}> Edit</button>
                <button 
                    className='PostItem__Card__Button--delete btn--primary' 
                    type='button'
                    onClick={()=>deletePost(id)}>Delete</button>
            </article>
        </section>

    </article>
  );
};

export default PostListItem;
