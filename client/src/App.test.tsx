import React from 'react';
import {createMemoryHistory} from 'history'
import {Link, Route, Router, Switch} from 'react-router-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import App from './App';

function renderWithRouter(
  ui:any,
  route:any = '/',
  history = createMemoryHistory({initialEntries: [route]})
  
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  }
}

xtest('full app rendering', () => {
  const {container} = renderWithRouter(<App />)
  expect(container.innerHTML).toMatch('Blogger App')
})
xtest('full app rendering and navigating to Add new page', () => {
  const {container} = renderWithRouter(<App />);
  const leftClick = {button: 0}
  fireEvent.click(screen.getByText(/Add Post/i), leftClick)
  expect(container.innerHTML).toMatch('New Post')
})
xtest('full app rendering and navigating to edit page', () => {
  const {container} = renderWithRouter(<App />,'/posts/new/s-on9Sj?mode=edit');
  expect(container.innerHTML).toMatch('New Post')
})
