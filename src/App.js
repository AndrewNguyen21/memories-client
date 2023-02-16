import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Creator from './components/Creator/Creator';
import PostDetails from './components/PostDetails/PostDetails';
import Tags from './components/Tags/Tags';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth='xl'>
        <Navbar />
        <Switch>
          <Route path='/' exact component={() => <Redirect to='/posts' />} />
          <Route
            path='/posts'
            exact
            component={() => (!user ? <Redirect to='/auth' /> : <Home />)}
          />
          <Route path='/posts/search' exact component={Home} />
          <Route path='/posts/:id' component={PostDetails} />
          <Route path='/creators/:name' exact component={Creator} />
          <Route path='/tags/:name' exact component={Tags} />
          <Route
            path='/auth'
            exact
            component={() => (!user ? <Auth /> : <Redirect to='/posts' />)}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
