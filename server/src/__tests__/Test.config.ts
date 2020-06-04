import ApolloServerBase,{createTestClient} from 'apollo-server-testing';
import  gql from 'graphql-tag';
import  nock from 'nock';

import {constructTestServer} from '../testConfig/configs'
//const {constructTestServer} = require('./__utils');

// the mocked REST API data
import {postsMockResponse, postMockResponse, postCreateResponseMock} from '../testConfig/mocks';
import { LOAD_POSTS, GET_POST, UPDATE_POST, ADD_POST } from '../Queries';
import { Post } from '../interface/Post';
import { PostDataSource } from '../datasources/postDataSource';
// the mocked SQL DataSource store

const initMockServer = (mockresponse:any) => {
  const postsDataAPI:any = new PostDataSource();
  const getStub = ()=> Promise.resolve(mockresponse());
  postsDataAPI.get = jest.fn(getStub)
  postsDataAPI.patch = jest.fn(getStub)
  postsDataAPI.post = jest.fn(getStub)
  

  // use our test server as input to the createTestClient fn
  // This will give us an interface, similar to apolloClient.query
  // to run queries against our instance of ApolloServer
  const { query,mutate } = constructTestServer(() => ({ postsDataAPI }));
  return {query,postsDataAPI,mutate}
}

describe('Queries', () => {
  beforeAll(()=>{
    
  })
  it("check jest",()=>{
    expect(2).toBe(2);
  })
  it('fetches list of posts', async () => {
    const {query,postsDataAPI} = initMockServer(postsMockResponse);
    const res = await query({query: LOAD_POSTS});
    expect(res.data).toMatchSnapshot();
    expect(res.errors).toBe(undefined);
    expect(postsDataAPI.get).toHaveBeenCalledWith('/posts');
    expect(res?.data?.posts).toEqual(postsMockResponse())
  });
  it('fetch post', async () => {
    const {query,postsDataAPI} = initMockServer(postMockResponse);
    const res = await query({query: GET_POST,variables:{id:'2'}});
    expect(res.data).toMatchSnapshot();
    expect(res.errors).toBe(undefined);
    expect(postsDataAPI.get).toHaveBeenCalledWith('/posts/2');
    expect(res?.data?.post).toEqual(postMockResponse())
  });
  it('mutate post:get Post with ID', async () => {
    const {mutate,postsDataAPI} = initMockServer(postMockResponse);
    const variables = {"description": "ABC Test", "id": "s-on9Sj", "title": "Test ABC"};
    const res = await mutate({mutation: UPDATE_POST,variables});
    expect(res.data).toMatchSnapshot();
    expect(res.errors).toBe(undefined);
    expect(postsDataAPI.patch).toHaveBeenCalledWith('/posts/s-on9Sj',variables);
    expect(res?.data?.post).toEqual(postMockResponse())
  });
  it('mutate post:add New Post', async () => {
    const {mutate,postsDataAPI} = initMockServer(postCreateResponseMock);
    const input = {"description": "ABC Test", "title": "Test ABC"};
    const res = await mutate({mutation: ADD_POST,variables:{input}});
    expect(res.data).toMatchSnapshot();
    expect(res.errors).toBe(undefined);
    expect(postsDataAPI.post).toHaveBeenCalledWith('/posts',input);
    expect(res?.data?.post).toEqual(postCreateResponseMock())
  });
});