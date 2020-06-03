import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PostListItem from "./PostListItem";
import { Route, Router } from "react-router-dom";
import PostList from "./PostList";
import renderer from 'react-test-renderer';

const posts= [
    {
      id: "s-on9Sj",
      title: "New title 121",
      description: "New description 1",
    },
    {
      id: "WzSLQSz",
      title: "New title 12",
      description: "New description 21",
    },
  ];
test("Renders post list with 2 items", async () => {
  render(
        <PostList  posts={posts} edit={jest.fn()} delete={jest.fn()} />
  );
  //screen.debug();
  const items = await screen.findAllByTestId('PostList-Item');
  expect(items).toHaveLength(2);
  
  
});
test("Post item and description text", async () => {
    const component = renderer.create(
          <PostList  posts={posts} edit={jest.fn()} delete={jest.fn()} />
    );
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot();
    const edit = jest.fn();
  });
