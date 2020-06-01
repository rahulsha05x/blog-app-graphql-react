import React from "react";
import "./PostDetail.css";
import { Row, Col } from "reactstrap";
import { usePost } from "../hooks";
interface Props {
  match: any;
}
const PostDetail: React.FC<Props> = (props: Props) => {
  const { postId } = props.match.params;
  const { post } = usePost(postId);
  return (
    <section className="PostDetail">
      <Row>
        <Col>
          <h2 className="PostDetail__Title">{post.title}</h2>
          <p className="PostDetail__Description">{post.description}</p>
        </Col>
      </Row>
    </section>
  );
};

export default PostDetail;
