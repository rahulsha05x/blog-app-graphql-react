import React from "react";
import "./PostDetail.css";
import { Row, Col } from "reactstrap";
import { usePostById } from "../hooks";
interface Props {
  match: any;
}
/**
 * Post Detail displays single Component
 * Props contains postId extracted from react router params.
 */
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
