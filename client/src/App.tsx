import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Container } from 'reactstrap';
import PostBoard from './Post/PostBoard/PostBoard';
import PostForm from './Post/PostForm/PostForm';
import PostDetail from './Post/PostDetail/Postdetail';
import Header from './common/Header/Header';
import { APP_HEADER_TEXT, GRAPHQL_URL } from './const/en';

const cache = new InMemoryCache({});
const endpointUrl: string = GRAPHQL_URL;
const authLink = new ApolloLink((operation, forward) => {
  return forward(operation);
});
/*
Creating ApolloClient
@params link : ApolloLink
@params cache
*/
export const client = new ApolloClient({
  link: ApolloLink.from([authLink, new HttpLink({ uri: endpointUrl })]),
  cache: cache,
});

//App component
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header headerText={APP_HEADER_TEXT} />
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
