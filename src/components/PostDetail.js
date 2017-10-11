import React, { Component } from 'react';
import { Dimmer, Loader, Header, Divider, Container, Menu, Icon, Segment, Comment as CommentFeed, Form, Button, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchComments, voteComment } from '../actions';

class PostDetail extends Component {
  componentDidMount() {
    this.fetchPost()
    this.props.dispatch(fetchComments(this.props.match.params.id))
    setTimeout(() => this.setState({ loading: false }), 1000)
  }

  fetchPost = () => {
    fetch(`http://localhost:3001/posts/${this.props.match.params.id}`, {
      headers: { 'Authorization' : 'asdf' }
    })
    .then(res => res.json())
    .then(res => this.setState({ post: res }))
  }

  handleSorting = (data) => {
    this.setState({ sort: data })
  }

  state = {
    loading: true,
    post: [],
    sort: 'most-liked'
  }

  render() {
    const { loading, post, sort } = this.state
    const { comments } = this.props
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

    let allComments
      if (sort === 'most-liked') {
        allComments = comments.sort((a, b) => (
          b.voteScore - a.voteScore
        ))
      } else if (sort === 'least-liked') {
        allComments = comments.sort((a, b) => (
          a.voteScore - b.voteScore
        ))
      } else {
        allComments = comments.sort((a, b) => (
          b.timestamp - a.timestamp
        ))
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

            <Dropdown item text='Sort by'>
              <Dropdown.Menu>
                <Dropdown.Item name='most-liked' active={sort === 'most-liked'} onClick={(e, data) => this.handleSorting(data.name)} >Most liked</Dropdown.Item>
                <Dropdown.Item name='least-liked' active={sort === 'least-liked'} onClick={(e, data) => this.handleSorting(data.name)} >Least liked</Dropdown.Item>
                <Dropdown.Item name='most-recent' active={sort === 'most-recent'} onClick={(e, data) => this.handleSorting(data.name)} >Most recent</Dropdown.Item>
                <Dropdown.Item></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {allComments.map((item) => (

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
                    <Icon size='large' id='thumb-up' name='thumbs up' onClick={() => this.props.dispatch(voteComment(item.id, 'upVote'))} />
                  </CommentFeed.Action>

                    <span id='commentScore'>{item.voteScore}</span>

                  <CommentFeed.Action>
                    <Icon size='large' id='thumb-down' name='thumbs down' onClick={() => this.props.dispatch(voteComment(item.id, 'downVote'))} />
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

const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

export default connect(mapStateToProps)(PostDetail)
