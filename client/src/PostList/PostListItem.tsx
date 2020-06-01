import React from "react";
import './PostListItem.css';
import { Link } from "react-router-dom"
import { Post } from "./Post";
interface Props {
    post:Post,
    edit: (id:string) => void,
    deletePost: (id:string) => void,
}
const PostListItem:React.FC<Props> = ({post,deletePost,edit}: Props) => {
  const { id, title, description } = post;
  const trimDescription = description.length > 100? `${description.substring(0,150)}...`:description;
  return (
    <article className='PostItem'>
        <section className='PostItem__Card'>
            <h2 className='PostItem__Card--Heading' title={title}>
                <Link to={`/posts/${id}`}>{title}</Link>
            </h2>
            <p className='PostItem__Card--Description'>
                {trimDescription}
            </p>
            <section className='PostItem__Card__Button'>
                <button type='button' 
                    className='PostItem__Card__Button--edit btn--primary'
                    onClick={()=>edit(id)}> Edit</button>
                <button 
                    className='PostItem__Card__Button--delete btn--primary' 
                    type='button'
                    onClick={()=>deletePost(id)}>Delete</button>
            </section>
        </section>

    </article>
  );
};

export default PostListItem;
