import React, { Component } from 'react';
import { Dimmer, Loader, Header, Divider, Container, Menu, Icon, Segment, Comment as CommentFeed, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class PostDetail extends Component {
  componentDidMount() {
    this.fetchPost()
    this.fetchComments()
    setTimeout(() => this.setState({ loading: false }), 800)
  }

  fetchPost = () => {
    fetch(`http://localhost:3001/posts/${this.props.match.params.id}`, {
      headers: { 'Authorization' : 'asdf' }
    })
    .then(res => res.json())
    .then(res => this.setState({ post: res }))
  }

  fetchComments = () => {
    fetch(`http://localhost:3001/posts/${this.props.match.params.id}/comments`, {
      headers: { 'Authorization' : 'asdf' }
    })
    .then(res => res.json())
    .then(res => this.setState({ comments: res }))
  }

  state = {
    loading: true,
    post: [],
    comments: []
  }

  render() {
    const { loading, post, comments } = this.state
    console.log(post, comments)

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
      <Menu secondary size='large'>
        <Menu.Item name='back' as={Link} to='/'>
          <Icon size='large' name='chevron left' />
        </Menu.Item>
      </Menu>
        <Container textAlign='left'>
          <Header as='h1' textAlign='left'>{post.title}
          <Header.Subheader>
            posted {post.timestamp} by {post.author}
          </Header.Subheader>
          </Header>
          <Divider />
          <Segment basic padded='very' textAlign='left' size='massive'>
            {post.body}
          </Segment>


          <CommentFeed.Group>
            <Header as='h3' dividing>Comments</Header>
            {comments.map((item) => (

              <CommentFeed key={item.id}>

              <CommentFeed.Avatar as={Icon} name='user circle' size='large' inverted color='blue' />

              <CommentFeed.Content>
                <CommentFeed.Author>
                  {item.author}
                </CommentFeed.Author>

                <CommentFeed.Metadata>
                  <span>{item.timestamp}</span>
                </CommentFeed.Metadata>

                <CommentFeed.Text>
                  <p>{item.body}</p>
                </CommentFeed.Text>

                <CommentFeed.Actions>
                  <CommentFeed.Action>
                    <Icon size='large' id='thumb-up' name='thumbs up' />
                  </CommentFeed.Action>

                    <span id='commentScore'>{item.voteScore}</span>

                  <CommentFeed.Action>
                    <Icon size='large' id='thumb-down' name='thumbs down' />
                  </CommentFeed.Action>
                </CommentFeed.Actions>

              </CommentFeed.Content>

              </CommentFeed>
            ))}
            <Form reply>
              <Form.TextArea />
              <Button circular inverted color='blue' content='Add Reply' />
            </Form>
          </CommentFeed.Group>
        </Container>

      </div>
    )
  }
}

export default PostDetail
