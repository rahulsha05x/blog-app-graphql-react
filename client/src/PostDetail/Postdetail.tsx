import React from "react";
import "./PostDetail.css";
import { Row, Col } from "reactstrap";
import { usePost, usePostById } from "../hooks";
interface Props {
  match: any;
}
const PostDetail: React.FC<Props> = (props: Props) => {
  const { postId } = props.match.params;
  const { post } = usePostById(postId);
  return (
    <section className="PostDetail">
      <Row>
        <Col>
          <h2 className="PostDetail__Title" data-testid='PostDetail__Title'>{post.title}</h2>
          <p className="PostDetail__Description" data-testid='PostDetail__Description'>{post.description}</p>
        </Col>
      </Row>
    </section>
  );
};

export default PostDetail;
