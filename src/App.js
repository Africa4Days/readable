import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchCategories } from './actions'
import HomePage from './components/HomePage'
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
      <HomePage />
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

export default connect(mapStateToProps)(App)
