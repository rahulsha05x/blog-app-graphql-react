import React from "react";
import './PostDetail.css'
import { Row, Col } from "reactstrap";
import { useGetPost } from "../hooks";
interface Props {
    match:any
}
const PostDetail:React.FC<Props> = (props:Props) => {
  const { postId } = props.match.params;  
  const {displayPost} = useGetPost(postId);
  return (
    <section className='PostDetail'>
        <Row>
            <Col>
            <h2 className="PostDetail__Title">{displayPost.title}</h2>
              <p className="PostDetail__Description">{displayPost.description}</p>

            </Col>
        </Row>
    </section>
  );
};

export default PostDetail;
