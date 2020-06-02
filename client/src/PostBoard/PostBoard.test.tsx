import React from "react";
import { render, fireEvent, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import PostBoard from "./PostBoard";
import { MockedProvider } from "@apollo/react-testing";
import { client } from "../App";
import { LOAD_POSTS, GET_POST } from "../Queries";
import { BrowserRouter } from "react-router-dom";
import { customRender } from "../testUtils/CustomeRender";
import { findByText } from "@testing-library/dom";
import PostDetail from "../PostDetail/Postdetail";

const waitForData = () => new Promise((res) => setTimeout(res, 0));
const mocksPosts = {
  request: {
    query: LOAD_POSTS,
    variables : {}
  },
  result: {
    data: {
      posts: [
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
      ],
    },
  },
};
const mocksPost = {
  request: {
    query: GET_POST,
    variables:{id:'s-on9Sj'}
  },
  result: {
    data: {
      post: {
        id: "s-on9Sj",
        title: "New title 121",
        description: "New description 1",
      },
    },
  },
};
describe("Postboard", () => {
  test("Postboard loaded", async () => {
    const component = customRender(<PostBoard />, "", [mocksPosts, mocksPost]);
    const el = component.container;
    expect(screen.getByTestId("postlist-container")).toHaveClass("PostList");
  });
  test("Postboard have 2 posts", async () => {
    const component = customRender(<PostBoard />, "", [mocksPosts, mocksPost]);
    const el = component.container;
    fireEvent.click(screen.getByText("Add Post"));
    const item = await screen.findAllByTestId('postitem-heading')
    expect(item).toHaveLength(2)
  });
});
