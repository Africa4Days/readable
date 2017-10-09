import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

class PostDetail extends Component {
  componentDidMount() {
    this.fetchPost()
    setTimeout(() => this.setState({ loading: false }), 1200)
  }

  fetchPost = () => {
    fetch(`http://localhost:3001/posts/${this.props.match.params.id}`, {
      headers: { 'Authorization' : 'asdf' }
    })
    .then(res => res.json())
    .then(res => this.setState({ post: res }))
  }

  state = {
    loading: true,
    post: []
  }

  render() {
    const { loading, post } = this.state
    let postID = this.props.match.params.id
    console.log(post)

    if (loading) {
      return (
        <div>
          <Dimmer active>
            <Loader content='loading' />
          </Dimmer>
        </div>
      )
    }

    return (
      <div>
        {post.title}
      </div>
    )
  }
}

export default PostDetail
