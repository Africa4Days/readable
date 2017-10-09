import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchCategories } from './actions'
import { Route, Switch, withRouter } from 'react-router-dom'
import HomePage from './components/HomePage'
import PostDetail from './components/PostDetail'
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
      </Switch>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    categories: state.categories
  }
}

export default withRouter(connect(mapStateToProps)(App))
