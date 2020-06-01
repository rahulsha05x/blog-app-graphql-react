import { gql } from "apollo-boost";

export const LOAD_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      description
    }
  }
`;
export const DELETE_POSTS = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      status
    }
  }
`;
export const ADD_POST = gql`
  mutation CreatePost($input: CreatePostInput) {
    post: createPost(input: $input) {
      id
      title
      description
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String, $description: String) {
    post: updatePost(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;
export const GET_POST = gql`
query getPost($id: ID!) {
  post(id: $id) {
    id
    title
    description
  }
}
`