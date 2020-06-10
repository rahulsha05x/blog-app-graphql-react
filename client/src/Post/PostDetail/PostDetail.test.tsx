import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PostDetail from './Postdetail';
import { customRender } from '../../testUtils/CustomeRender';
import { GET_POST } from '../../Queries';
import PostBoard from '../PostBoard/PostBoard';
import { Route } from 'react-router-dom';

const waitForData = () => new Promise((res) => setTimeout(res, 1));
const mocksPost = {
  request: {
    query: GET_POST,
    variables: { id: 's-on9Sj' },
  },
  result: {
    data: {
      post: {
        id: 's-on9Sj',
        title: 'New title 121',
        description: 'New description 1',
      },
    },
  },
};
describe('Post detail', () => {
  test('Post detail loaded', async () => {
    try {
      const component = await customRender(
        <PostDetail match={{ params: { postId: 's-on9Sj' } }} />,
        '/posts/s-on9Sj',
        [mocksPost]
      );
      const item = await screen.findAllByTestId('PostDetail__Title');
      const item2 = await screen.findAllByTestId('PostDetail__Description');
      // screen.debug();
      expect(item[0].textContent).toBe('New title 121');
      expect(item2[0].textContent).toBe('New description 1');
    } catch (error) {
      console.log('Error in test case', error);
    }
  });
});
