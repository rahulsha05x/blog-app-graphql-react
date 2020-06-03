import * as React from "react";
import { render } from "@testing-library/react";
import { Router, Switch } from "react-router-dom";
import { createMemoryHistory } from "history";
import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import renderer from 'react-test-renderer';
export const customRender = (
  node: JSX.Element | null,
  route: string = "/",
  mocks?: MockedResponse[]
) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  return {
    history,
    ...render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router history={history}>
          <Switch>{node}</Switch>
        </Router>
      </MockedProvider>
    ),
  };
};
