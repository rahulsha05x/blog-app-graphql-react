import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import {ApolloClient,InMemoryCache,ApolloLink,HttpLink} from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import { Container } from "reactstrap";
import PostBoard from "./PostBoard/PostBoard";
import PostForm from "./PostForm/PostForm";
import PostDetail from "./PostDetail/Postdetail";
import Header from "./Header/Header";

const cache = new InMemoryCache({});
const endpointUrl = "http://localhost:9000";
const authLink = new ApolloLink((operation,forward)=>{
  
  return forward(operation);
})
const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    new HttpLink({uri:endpointUrl})
  ]),
  cache:cache,
  
})
function App() {
  return (
    <ApolloProvider client={client}>

      <Router>
        <div>
          <Header />
          <section className="section">
            <Container fluid={true}>
              <Switch>
                <Route exact path="/" component={PostBoard} />
                <Route exact path="/posts/new" component={PostForm} />
                <Route exact path="/posts/new/:postId" component={PostForm} />
                <Route path="/posts/:postId" component={PostDetail} />              
              </Switch>
            </Container>
          </section>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
