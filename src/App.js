import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchCategories } from './actions'
import { Route, Switch, withRouter } from 'react-router-dom'
import HomePage from './components/HomePage'
import PostDetail from './components/PostDetail'
import CreatePost from './components/CreatePost'
import './App.css';
import '../node_modules/semantic-ui-css/semantic.min.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts())
    this.props.dispatch(fetchCategories())
  }

  render() {
    return (
    <div className="App">
      <Switch>
        <Route
          path='/'
          exact
          component={HomePage}
        />
        <Route
          path='/posts/:id'
          component={PostDetail}
        />
        <Route
          path='/posts'
          exact
          component={CreatePost}
        />
      </Switch>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.reducer.posts,
    categories: state.reducer.categories
  }
}

export default withRouter(connect(mapStateToProps)(App))
