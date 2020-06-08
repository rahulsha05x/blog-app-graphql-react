import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from 'apollo-boost';
import gql from 'graphql-tag';

const endpointUrl = 'http://localhost:8000/posts';
const authLink = new ApolloLink((operation, forward) => {
  return forward(operation);
});
const client = new ApolloClient({
  link: ApolloLink.from([authLink, new HttpLink({ uri: endpointUrl })]),
  cache: new InMemoryCache(),
});

export const loadPosts = async () => {
  const query = gql`
    query {
      posts {
        id
        title
        description
      }
    }
  `;
  const { data } = await client.query({ query, fetchPolicy: 'no-cache' });
  //const response = await graphqlRequest(query);
  return data.posts;
};
export const loadPost = async (id: string) => {
  const query = gql`
    query getPost($id: ID!) {
      post(id: $id) {
        id
        title
        description
      }
    }
  `;
  const variables = { id };
  const {
    data: { post },
  } = await client.query({ query, variables });
  return post;
};

export const deletePost = async (id: string) => {
  const mutation = gql`
    mutation DeletePost($id: ID!) {
      deletePost(id: $id) {
        status
      }
    }
  `;
  const variables = { id };
  const { data } = await client.mutate({ mutation, variables });
  return data;
};
export const addPost = async (input: any) => {
  const mutation = gql`
    mutation CreatePost($input: CreatePostInput) {
      post: createPost(input: $input) {
        id
        title
        description
      }
    }
  `;
  const variables = { input };
  const { data } = await client.mutate({ mutation, variables });
  return data;
};
export const updatePost = async (
  id: string,
  title: string,
  description: string
) => {
  const mutation = gql`
    mutation UpdatePost($id: ID!, $title: String, $description: String) {
      post: updatePost(id: $id, title: $title, description: $description) {
        id
        title
        description
      }
    }
  `;
  const variables = { id, title, description };
  const { data } = await client.mutate({ mutation, variables });
  return data;
};

// const jobQuery = gql`query JobQuery($id:ID!){
//   job(id:$id) {
//     id
//     title
//     company {
//       id
//       name
//       description
//     }
//     description

//   }
// }
// `;
// export const getJob = async (id) => {

//   const variables = { id };
//   const {data:{job}} = await client.query({query:jobQuery,variables});
//   //const response = await graphqlRequest(query, variables);
//   return job;
// };
// export const getCompanyById = async (id) => {
//     const query = gql`query CompanyQuery($id:ID!){
//         company(id:$id) {
//           id
//           name
//           description
//           jobs {
//               id
//               title
//               description
//           }
//         }
//       }`
//     const variables = {id}
//     //const response = await graphqlRequest(query,variables);
//     const {data:{company}} = await client.query({query,variables});
//     return company;
// }

// export const addNewJob = async (input) => {
//     const query = gql` mutation CreateJob($input:CreateJobInput) {
//         job:createJob(input:$input) {
//           id
//           title
//           company {
//             id
//             name
//             description
//           }
//           description
//         }
//       }`

//      // const responseBody = await graphqlRequest(query,{input})
//       const {data:{job}} = await client.mutate({
//         mutation:query,
//         variables:{input},
//         update:(cache,{data})=>{
//           cache.writeQuery({
//             query:jobQuery,
//             variables:{id:data.job.id},
//             data
//           })
//         }});
//       return job
// }
