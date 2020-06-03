import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import PostListItem from "./PostListItem";
import { Route, Router } from "react-router-dom";

const post = {
  id: "1",
  title: "New post 1",
  description: "New post description 1",
};
test("Renders post list item", () => {
  render(
        <PostListItem key="1" post={post} edit={jest.fn()} deletePost={jest.fn()} />
  );
  expect(screen.getByTitle('New post 1')).not.toBe(null);
  
});
test("Renders post list item", () => {
    render(
          <PostListItem key="1" post={post} edit={jest.fn()} deletePost={jest.fn()} />
    );
    
    expect(screen.getByText('New post description 1')).not.toBe(null);
  });
afterEach(cleanup);