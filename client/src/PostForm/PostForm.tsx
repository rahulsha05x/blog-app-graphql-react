import React, { useReducer, useEffect } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { loadPost } from "../request";
import { useLocation, useParams } from "react-router-dom";
import { usePost } from "../hooks";
import {
  EDIT_POST_TEXT,
  NEW_POST_TEXT,
  TITLE_TEXT,
  DESCRIPTION_TEXT,
  SUBMIT_BUTTON_TEXT,
} from "../const/config";

interface State {
  title: string;
  description: string;
}
interface Action {
  type: string;
  payload: any;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "title":
      return {
        ...state,
        title: action.payload,
      };
    case "description":
      return {
        ...state,
        description: action.payload,
      };
    default:
      throw new Error("Cannot find type");
  }
};
const initialState: State = {
  title: "",
  description: "",
};
const useQuery = (): URLSearchParams => {
  return new URLSearchParams(useLocation().search);
};
const PostForm: React.FC = () => {
  const { updatePost, createPost } = usePost();
  const [state, dispatch] = useReducer(reducer, initialState);
  const query: URLSearchParams | null = useQuery();
  let { postId } = useParams();
  const mode: string | null = query.get("mode");

  const handleChange = (e: React.ChangeEvent<any>) => {
    const {
      target: { value },
    } = e;
    const {
      target: { name },
    } = e;
    dispatch({ type: name, payload: value });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("clicked", state);
    if (mode === "edit") {
      updatePost(postId, state.title, state.description);
    } else {
      createPost(state);
    }
  };

  useEffect(() => {
    if (mode && mode === "edit") {
      loadPost(postId).then((post) => {
        dispatch({ type: "title", payload: post.title });
        dispatch({ type: "description", payload: post.description });
      });
    }
  }, [mode, postId]);
  const heading = mode === "edit" ? EDIT_POST_TEXT : NEW_POST_TEXT;
  return (
    <section>
      <h1 className="title">{heading}</h1>
      <div className="box">
        <Form>
          <FormGroup>
            <Label for="title">{TITLE_TEXT}</Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              value={state.title}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">{DESCRIPTION_TEXT}</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              value={state.description}
              onChange={handleChange}
            />
          </FormGroup>
          <div className="field">
            <div className="control">
              <button
                className="button is-link btn--primary"
                type="button"
                onClick={handleClick}
                disabled={!state.title || !state.description}
              >
                {SUBMIT_BUTTON_TEXT}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default PostForm;
