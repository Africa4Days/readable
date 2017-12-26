import React, { Component } from 'react';
import { Dimmer, Loader, Header, Divider, Container, Menu, Icon, Segment, Comment as CommentFeed, Dropdown, Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchComments, voteComment, createComment, deleteComment, deletePost, fetchPost, votePost } from '../actions';
import { Field, reduxForm, initialize } from 'redux-form';

class PostDetail extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPost(this.props.match.params.id))
    this.props.dispatch(fetchComments(this.props.match.params.id))
    setTimeout(() => this.setState({ loading: false }), 1000)
  }

  handleSorting = (data) => {
    this.setState({ sort: data })
  }

  mySubmit = (values) => {
    console.log(values)
    this.props.dispatch(createComment(this.props.match.params.id, values))
    this.props.dispatch(fetchComments(this.props.match.params.id))
    this.props.dispatch(initialize('CreateComment', {}))
  }

  readableTime = (timestamp) => {
    let date = new Date(timestamp)
    return date.toDateString()
  }

  required = (value) => value ? undefined : 'Required'

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && ((error && <span id='error'><Icon name='warning circle' size='large' />{error}</span>))}
      </div>
    </div>
  )

  renderBody = ({ textarea, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div>
        <textarea {...textarea} placeholder={label} type={type} />
        {touched && ((error && <span id='error'><Icon name='warning circle' size='large' />{error}</span>))}
      </div>
    </div>
  )

  onPostDelete = (postID) => {
    this.props.dispatch(deletePost(postID))
    this.props.history.push('/');
  }

  state = {
    loading: true,
    sort: 'most-liked',
  }

  render() {
    const { loading, sort } = this.state
    const { comments, handleSubmit, post } = this.props

    if (loading) {
      return (
        <div>
          <Dimmer active>
            <Loader content='loading' />
          </Dimmer>
        </div>
      )
    }

    if (post.timestamp === undefined) {
      return (
        <div>
        <Menu id='menu' pointing secondary size='large'>
          <Menu.Item name='back' as={Link} to='/'>
            <Icon size='large' name='chevron left' />
          </Menu.Item>
        </Menu>
        <div id='postDeleted'>
         Sorry, this post has been deleted.
        </div>
        </div>
      )
    } else {

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
      <Menu id='menu' pointing secondary size='large'>
        <Menu.Item name='back' as={Link} to='/'>
          <Icon size='large' name='chevron left' />
        </Menu.Item>
      </Menu>
        <Container textAlign='left'>
          <Header as='h1' textAlign='left'>{post.title}
          <Header.Subheader>
            posted on {this.readableTime(post.timestamp)} by {post.author}
          </Header.Subheader>
          </Header>

          <div>
          <Icon id='thumb-up' name='thumbs outline up' size='large' onClick={(event) => this.props.dispatch(votePost(post.id, 'upVote'))} />
          {post.voteScore}
          <Icon id='thumb-down' name='thumbs outline down' size='large' onClick={(event) => this.props.dispatch(votePost(post.id, 'downVote'))} />
          </div>



          <Divider />
          <Segment basic padded='very' textAlign='left' size='massive'>
            {post.body}
          </Segment>

          <div id='details-buttons'>
            <Icon id='trash' size='large' name='trash outline' onClick={() => this.onPostDelete(post.id)}/>
            <Link
              to={'/edit/' + post.id}
            >
            <Icon id='edit-detail' size='large' name='edit' />
            </Link>
          </div>


          <CommentFeed.Group>
            <Header as='h3' dividing>Comments ({post.commentCount})</Header>

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
                  <span>{this.readableTime(item.timestamp)}</span>
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

                  <div id='edit-buttons'>
                    <CommentFeed.Action>
                      <Icon size='large' id='trash' name='trash outline' onClick={() => this.props.dispatch(deleteComment(item.id))} />
                    </CommentFeed.Action>

                    <CommentFeed.Action onClick={this.show} as={Link} to={'/edit/comments/' + item.id}>
                      <Icon size='large' id='edit' name='edit' />
                    </CommentFeed.Action>
                  </div>
                </CommentFeed.Actions>

              </CommentFeed.Content>

              </CommentFeed>
            ))}
            <Header as='h3'>Add a comment</Header>
          </CommentFeed.Group>

          <Form form='CreateComment' onSubmit={handleSubmit(this.mySubmit)}>
            <div>
              <div id='author'>
                <Field
                  name='author'
                  label='Author'
                  component={this.renderField}
                  type='text'
                  validate={this.required}
                />
              </div>
            </div>
            <div>
              <div>
                <Field
                  name='body'
                  label='Comment'
                  component={this.renderField}
                  type='text'
                  validate={this.required}
                />
              </div>
            </div>
            <Button id='submitButton' type='submit'>Add comment</Button>
          </Form>

        </Container>

      </div>
    )
  }
}
}

const mapStateToProps = (state) => {
  return {
    comments: state.reducer.comments,
    post: state.reducer.post
  }
}

export default reduxForm({ form: 'CreateComment' })(connect(mapStateToProps)(PostDetail))
